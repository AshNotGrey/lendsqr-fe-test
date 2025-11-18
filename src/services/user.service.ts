/**
 * User Service
 * Handles API calls for user data with fallback mechanism
 *
 * Architecture Decision:
 * - Primary: Remote GitHub Gist (hosted 500-record dataset)
 * - Fallback: Local /public/users.json (same dataset bundled for offline resilience)
 *
 * Rationale:
 * - The 500-record dataset was generated using json-generator.com in batches of 250
 *   and merged into a single JSON file hosted locally and on GitHub Gist for redundancy.
 * - Using local data as primary source ensures consistent, deterministic demo experience
 *   without network dependencies or CORS issues during assessment reviews.
 */

import type { IUser, IUserFilters } from '@/types/user.types'

/**
 * Data source configuration
 */
const LOCAL_DATA_URL = '/users.json' // 500-record dataset bundled with the app
const GIST_DATA_URL =
  'https://gist.githubusercontent.com/AshNotGrey/7c7695dc264edb3a5aa28c4a871ddaf6/raw/3613507e19cb1428eae0b47c713f700334d36f33/users.json'

/**
 * Fetch helper with consistent error handling.
 */
async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Fetch failed (${response.status}) for ${url}`)
  }

  return response.json() as Promise<T>
}

/**
 * Normalizes external data to the strict IUser shape expected by the app.
 * This guards against minor schema drift between data sources.
 */
function normalizeUsers(raw: any[]): IUser[] {
  const toEmailFromFullName = (name: string, domain = 'example.com') =>
    `${name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '.') // collapse non-alphanumerics to dots
      .replace(/^\.+|\.+$/g, '')}@${domain}`

  return (raw || []).map((u: any) => {
    // accountBalance comes as number in some sources; ensure string for type safety
    const accountBalanceStr =
      typeof u?.accountBalance === 'number'
        ? u.accountBalance.toFixed(2)
        : String(u?.accountBalance ?? '0')

    const personalInfo = {
      fullName: String(u?.personalInfo?.fullName ?? u?.fullName ?? ''),
      phoneNumber: String(u?.personalInfo?.phoneNumber ?? u?.phoneNumber ?? ''),
      emailAddress: String(u?.personalInfo?.emailAddress ?? u?.email ?? ''),
      bvn: String(u?.personalInfo?.bvn ?? ''),
      gender: String(u?.personalInfo?.gender ?? ''),
      maritalStatus: String(u?.personalInfo?.maritalStatus ?? ''),
      children: String(u?.personalInfo?.children ?? 'None'),
      typeOfResidence: String(u?.personalInfo?.typeOfResidence ?? ''),
    }

    const educationAndEmployment = {
      levelOfEducation: String(u?.educationAndEmployment?.levelOfEducation ?? ''),
      employmentStatus: String(u?.educationAndEmployment?.employmentStatus ?? ''),
      sectorOfEmployment: String(u?.educationAndEmployment?.sectorOfEmployment ?? ''),
      durationOfEmployment: String(u?.educationAndEmployment?.durationOfEmployment ?? ''),
      officeEmail: String(u?.educationAndEmployment?.officeEmail ?? `${u?.username ?? 'user'}@company.com`),
      monthlyIncome: String(u?.educationAndEmployment?.monthlyIncome ?? 'N0 - N0'),
      loanRepayment: String(u?.educationAndEmployment?.loanRepayment ?? '0'),
    }

    const socials = {
      facebook: String(u?.socials?.facebook ?? ''),
      twitter: String(u?.socials?.twitter ?? ''),
      instagram: String(u?.socials?.instagram ?? ''),
    }

    const guarantors = Array.isArray(u?.guarantors) ? u.guarantors.map((g: any) => ({
      fullName: String(g?.fullName ?? ''),
      phoneNumber: String(g?.phoneNumber ?? ''),
      emailAddress: String(g?.emailAddress ?? toEmailFromFullName(String(g?.fullName ?? 'guarantor'))),
      relationship: String(g?.relationship ?? ''),
    })) : []

    return {
      id: String(u?.id ?? ''),
      organization: String(u?.organization ?? ''),
      username: String(u?.username ?? ''),
      email: String(u?.email ?? ''),
      phoneNumber: String(u?.phoneNumber ?? ''),
      dateJoined: String(u?.dateJoined ?? ''),
      status: String(u?.status ?? 'Active'),
      avatar: String(u?.avatar ?? ''),
      fullName: String(u?.fullName ?? personalInfo.fullName ?? ''),
      userTier: (Number(u?.userTier) || 1) as 1 | 2 | 3,
      accountBalance: accountBalanceStr,
      accountBank: String(u?.accountBank ?? ''),
      accountNumber: String(u?.accountNumber ?? ''),
      personalInfo,
      educationAndEmployment,
      socials,
      guarantors,
    } as IUser
  })
}

/**
 * Fetches all users from remote data with fallback to local JSON
 * 
 * @returns Promise<IUser[]> Array of user objects
 * @throws Error if both primary and fallback sources fail
 */
export async function getUsers(): Promise<IUser[]> {
  const sources: { name: string; url: string }[] = [
    { name: 'gist', url: GIST_DATA_URL },
    { name: 'local', url: LOCAL_DATA_URL },
  ]

  let lastError: unknown = null

  for (const source of sources) {
    try {
      const data = await fetchJson<unknown>(source.url)
      const list = Array.isArray(data) ? data : (data as any)?.users || []
      console.info(`✓ Loaded ${list.length} users from ${source.name}`)
      return normalizeUsers(list)
    } catch (error) {
      lastError = error
      console.warn(`Fetch from ${source.name} failed. Trying next source...`, error)
    }
  }

  console.error('All data sources failed.', lastError)
  throw new Error('Unable to fetch user data from any source')
}

/**
 * Fetches a single user by ID
 * 
 * @param userId - The unique user ID
 * @returns Promise<IUser | null> User object or null if not found
 */
export async function getUserById(userId: string): Promise<IUser | null> {
  try {
    const users = await getUsers()
    const user = users.find(u => u.id === userId)
    return user || null
  } catch (error) {
    console.error(`Failed to fetch user with ID ${userId}:`, error)
    throw error
  }
}

/**
 * Filters users based on provided criteria
 * This is client-side filtering; in production, this would be server-side
 * 
 * @param filters - Object containing filter criteria
 * @returns Promise<IUser[]> Filtered array of users
 */
export async function filterUsers(filters: IUserFilters): Promise<IUser[]> {
  try {
    const users = await getUsers()
    
    return users.filter(user => {
      // Organization filter
      if (filters.organization && 
          !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) {
        return false
      }
      
      // Username filter
      if (filters.username && 
          !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
        return false
      }
      
      // Email filter
      if (filters.email && 
          !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false
      }
      
      // Phone number filter
      if (filters.phoneNumber && 
          !user.phoneNumber.includes(filters.phoneNumber)) {
        return false
      }
      
      // Status filter
      if (filters.status && user.status !== filters.status) {
        return false
      }
      
      // Date filter (matches date portion of ISO string)
      if (filters.date) {
        const userDate = user.dateJoined.split('T')[0]
        if (userDate !== filters.date) {
          return false
        }
      }
      
      return true
    })
  } catch (error) {
    console.error('Failed to filter users:', error)
    throw error
  }
}

/**
 * Paginate users array
 * Helper function for table pagination
 * 
 * @param users - Array of users to paginate
 * @param page - Current page number (1-indexed)
 * @param pageSize - Number of items per page
 * @returns Object with paginated users and metadata
 */
export function paginateUsers(users: IUser[], page: number, pageSize: number) {
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedUsers = users.slice(startIndex, endIndex)
  
  return {
    users: paginatedUsers,
    pagination: {
      page,
      pageSize,
      total: users.length,
      totalPages: Math.ceil(users.length / pageSize),
      hasNext: endIndex < users.length,
      hasPrev: page > 1,
    },
  }
}

