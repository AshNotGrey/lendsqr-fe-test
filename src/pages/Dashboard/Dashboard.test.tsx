/**
 * Dashboard Page Tests
 * Tests users list, filtering, and pagination
 */

import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/store/auth-context'
import Dashboard from './Dashboard'
import * as userService from '@/services/user.service'

// Mock user service
vi.mock('@/services/user.service')

// Mock data
const mockUsers = [
  {
    id: 'LSQ001',
    organization: 'Lendsqr',
    username: 'grace',
    email: 'grace@lendsqr.com',
    phoneNumber: '07060780922',
    dateJoined: '2020-05-15T10:00:00.000Z',
    status: 'Active' as const,
    avatar: 'https://example.com/avatar.jpg',
    fullName: 'Grace Effiom',
    userTier: 1 as const,
    accountBalance: '200000.00',
    accountBank: 'Providus Bank',
    accountNumber: '9912345678',
    personalInfo: {
      fullName: 'Grace Effiom',
      phoneNumber: '07060780922',
      emailAddress: 'grace@lendsqr.com',
      bvn: '1234567890',
      gender: 'Female',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: "Parent's Apartment",
    },
    educationAndEmployment: {
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'grace@work.com',
      monthlyIncome: 'N200,000.00 - N400,000.00',
      loanRepayment: '40000',
    },
    socials: {
      facebook: 'grace.effiom',
      twitter: '@grace_effiom',
      instagram: '@grace_effiom',
    },
    guarantors: [],
  },
]

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = createTestQueryClient()
  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>{component}</AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

describe('Dashboard Page', () => {
  beforeEach(() => {
    // Mock successful auth
    localStorage.setItem('lendsqr_auth_token', 'mock-token')
    localStorage.setItem('lendsqr_user_email', 'test@example.com')
  })

  afterEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should show loading state initially', () => {
    vi.mocked(userService.getUsers).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    )

    renderWithProviders(<Dashboard />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should display users after successful fetch', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers)

    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Users')).toBeInTheDocument()
      expect(screen.getByText('grace')).toBeInTheDocument()
    })
  })

  it('should show error message on fetch failure', async () => {
    vi.mocked(userService.getUsers).mockRejectedValue(new Error('Failed to fetch'))

    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load users. Please try again later.')
      ).toBeInTheDocument()
    })
  })

  it('should display stat cards', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers)

    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('USERS')).toBeInTheDocument()
      expect(screen.getByText('ACTIVE USERS')).toBeInTheDocument()
      expect(screen.getByText('USERS WITH LOANS')).toBeInTheDocument()
      expect(screen.getByText('USERS WITH SAVINGS')).toBeInTheDocument()
    })
  })
})

