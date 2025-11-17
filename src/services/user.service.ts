/**
 * User Service
 * Handles API calls for user data with fallback mechanism
 * 
 * Architecture Decision:
 * - Primary: Fetch from json-generator.com (or other mock API)
 * - Fallback: Local /public/users.json file
 * This demonstrates resilience and error handling for production systems
 */

import type { IUser, IUserFilters } from '@/types/user.types'

/**
 * API configuration
 * User should replace MOCK_API_URL with their json-generator.com endpoint
 */
const MOCK_API_URL = import.meta.env.VITE_API_URL || ''
const FALLBACK_DATA_URL = '/users.json'

/**
 * Fetches all users from API with fallback to local data
 * 
 * @returns Promise<IUser[]> Array of user objects
 * @throws Error if both primary and fallback sources fail
 */
export async function getUsers(): Promise<IUser[]> {
  try {
    // Attempt to fetch from primary API source
    if (MOCK_API_URL) {
      const response = await fetch(MOCK_API_URL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`)
      }

      const data = await response.json()
      return Array.isArray(data) ? data : data.users || []
    }
    
    // If no API URL configured, go straight to fallback
    throw new Error('No API URL configured')
    
  } catch (error) {
    console.warn('Primary API fetch failed, using fallback data:', error)
    
    // Fallback to local JSON file
    try {
      const response = await fetch(FALLBACK_DATA_URL)
      
      if (!response.ok) {
        throw new Error(`Fallback data fetch failed with status: ${response.status}`)
      }
      
      const data = await response.json()
      return Array.isArray(data) ? data : data.users || []
      
    } catch (fallbackError) {
      console.error('Fallback data fetch also failed:', fallbackError)
      throw new Error('Unable to fetch user data from any source')
    }
  }
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

