/**
 * Dashboard Page Tests
 * Tests users list, filtering, and pagination
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@/store/auth-context'
import Dashboard from './Dashboard'
import * as userService from '@/services/user.service'

// Mock user service
vi.mock('@/services/user.service')

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

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
        gcTime: 0, // Disable cache for tests
        staleTime: 0, // Always fetch fresh data
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
    mockNavigate.mockClear()
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

    // Wait for React Query to resolve and table to render
    // Use findByText which automatically waits
    expect(await screen.findByText('grace', {}, { timeout: 3000 })).toBeInTheDocument()
    
    // "Users" appears multiple times (page title + stat card), use getAllByText
    expect(screen.getAllByText('Users').length).toBeGreaterThan(0)
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

  it('should calculate statistics correctly', async () => {
    const usersWithDifferentStatuses = [
      { ...mockUsers[0], status: 'Active' as const, accountBalance: '50000.00', educationAndEmployment: { ...mockUsers[0].educationAndEmployment, loanRepayment: '5000' } },
      { ...mockUsers[0], id: 'LSQ002', status: 'Inactive' as const, accountBalance: '0.00', educationAndEmployment: { ...mockUsers[0].educationAndEmployment, loanRepayment: '0' } },
      { ...mockUsers[0], id: 'LSQ003', status: 'Active' as const, accountBalance: '100000.00', educationAndEmployment: { ...mockUsers[0].educationAndEmployment, loanRepayment: '10000' } },
    ]

    vi.mocked(userService.getUsers).mockResolvedValue(usersWithDifferentStatuses)

    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      // Numbers appear multiple times in stat cards, use getAllByText
      expect(screen.getAllByText('3').length).toBeGreaterThan(0) // Total users
      expect(screen.getAllByText('2').length).toBeGreaterThan(0) // Active users
    })
  })

  it('should open filter popup when filter button is clicked', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers)

    renderWithProviders(<Dashboard />)

    await waitFor(() => {
      // "Users" appears multiple times, check for page content
      expect(screen.getAllByText(/^Users$/).length).toBeGreaterThan(0)
    })

    const filterButtons = screen.getAllByLabelText(/filter by/i)
    fireEvent.click(filterButtons[0])

    await waitFor(() => {
      expect(screen.getByLabelText('Organization')).toBeInTheDocument()
    })
  })

  it('should filter users when filter is submitted', async () => {
    const multipleUsers = [
      { ...mockUsers[0], organization: 'Lendsqr', username: 'grace' },
      { ...mockUsers[0], id: 'LSQ002', organization: 'Irorun', username: 'john' },
    ]

    vi.mocked(userService.getUsers).mockResolvedValue(multipleUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('grace', {}, { timeout: 3000 })).toBeInTheDocument()
    expect(screen.getByText('john')).toBeInTheDocument()

    // Open filter popup
    const filterButtons = screen.getAllByLabelText(/filter by/i)
    fireEvent.click(filterButtons[0])

    await waitFor(() => {
      expect(screen.getByLabelText('Organization')).toBeInTheDocument()
    })

    // Select organization filter
    const orgSelect = screen.getByLabelText('Organization')
    fireEvent.change(orgSelect, { target: { value: 'Lendsqr' } })

    // Submit filter
    const filterButton = screen.getByRole('button', { name: /filter/i })
    fireEvent.click(filterButton)

    await waitFor(() => {
      expect(screen.getByText('grace')).toBeInTheDocument()
      expect(screen.queryByText('john')).not.toBeInTheDocument()
    })
  })

  it('should reset filters when reset button is clicked', async () => {
    const multipleUsers = [
      { ...mockUsers[0], organization: 'Lendsqr', username: 'grace' },
      { ...mockUsers[0], id: 'LSQ002', organization: 'Irorun', username: 'john' },
    ]

    vi.mocked(userService.getUsers).mockResolvedValue(multipleUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('grace', {}, { timeout: 3000 })).toBeInTheDocument()

    // Open filter and apply
    const filterButtons = screen.getAllByLabelText(/filter by/i)
    fireEvent.click(filterButtons[0])

    await waitFor(() => {
      expect(screen.getByLabelText('Organization')).toBeInTheDocument()
    })

    const orgSelect = screen.getByLabelText('Organization')
    fireEvent.change(orgSelect, { target: { value: 'Lendsqr' } })
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))

    await waitFor(() => {
      expect(screen.queryByText('john')).not.toBeInTheDocument()
    })

    // Reset filters
    fireEvent.click(filterButtons[0])
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument()
    })
    fireEvent.click(screen.getByRole('button', { name: /reset/i }))

    await waitFor(() => {
      expect(screen.getByText('grace')).toBeInTheDocument()
      expect(screen.getByText('john')).toBeInTheDocument()
    })
  })

  it('should navigate to user details when user row is clicked', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('grace', {}, { timeout: 3000 })).toBeInTheDocument()

    // Click on action menu button (three dots)
    const actionButtons = screen.getAllByLabelText('User actions')
    fireEvent.click(actionButtons[0])

    // Click "View Details"
    await waitFor(() => {
      const viewDetailsButton = screen.getByText('View Details')
      fireEvent.click(viewDetailsButton)
    })

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/users/LSQ001')
    })
  })

  it('should handle pagination page changes', async () => {
    const manyUsers = Array.from({ length: 25 }, (_, i) => ({
      ...mockUsers[0],
      id: `LSQ${String(i + 1).padStart(3, '0')}`,
      username: `user${i + 1}`,
    }))

    vi.mocked(userService.getUsers).mockResolvedValue(manyUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('user1', {}, { timeout: 3000 })).toBeInTheDocument()

    // Find and click next page button
    const nextButton = screen.getByLabelText('Next page')
    fireEvent.click(nextButton)

    await waitFor(() => {
      expect(screen.getByText('user11')).toBeInTheDocument()
    })
  })

  it('should handle page size changes', async () => {
    const manyUsers = Array.from({ length: 25 }, (_, i) => ({
      ...mockUsers[0],
      id: `LSQ${String(i + 1).padStart(3, '0')}`,
      username: `user${i + 1}`,
    }))

    vi.mocked(userService.getUsers).mockResolvedValue(manyUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('user1', {}, { timeout: 3000 })).toBeInTheDocument()

    // Change page size to 20
    const pageSizeSelect = screen.getByDisplayValue('10')
    fireEvent.change(pageSizeSelect, { target: { value: '20' } })

    await waitFor(() => {
      expect(screen.getByText('user20')).toBeInTheDocument()
    })
  })

  it('should show empty state when no users match filters', async () => {
    vi.mocked(userService.getUsers).mockResolvedValue(mockUsers)

    renderWithProviders(<Dashboard />)

    // Wait for React Query to load and table to render
    expect(await screen.findByText('grace', {}, { timeout: 3000 })).toBeInTheDocument()

    // Apply filter that matches nothing
    const filterButtons = screen.getAllByLabelText(/filter by/i)
    fireEvent.click(filterButtons[0])

    await waitFor(() => {
      expect(screen.getByLabelText('Organization')).toBeInTheDocument()
    })

    const orgSelect = screen.getByLabelText('Organization')
    fireEvent.change(orgSelect, { target: { value: 'NonExistentOrg' } })
    fireEvent.click(screen.getByRole('button', { name: /filter/i }))

    await waitFor(() => {
      expect(screen.queryByText('grace')).not.toBeInTheDocument()
    })
  })
})

