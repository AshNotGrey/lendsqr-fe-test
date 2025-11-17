/**
 * UserDetails Page Tests
 * Tests user details display and localStorage caching
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/store/auth-context'
import UserDetails from './UserDetails'
import * as userService from '@/services/user.service'

// Mock user service
vi.mock('@/services/user.service')

const mockUser = {
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
  guarantors: [
    {
      fullName: 'Debby Ogana',
      phoneNumber: '07060780922',
      emailAddress: 'debby@gmail.com',
      relationship: 'Sister',
    },
  ],
}

const renderWithProviders = (userId: string = 'LSQ001') => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/users/:userId" element={<UserDetails />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>,
    { initialEntries: [`/users/${userId}`] }
  )
}

describe('UserDetails Page', () => {
  beforeEach(() => {
    localStorage.setItem('lendsqr_auth_token', 'mock-token')
    localStorage.setItem('lendsqr_user_email', 'test@example.com')
    vi.clearAllMocks()
  })

  afterEach(() => {
    localStorage.clear()
  })

  it('should display user details after successful fetch', async () => {
    vi.mocked(userService.getUserById).mockResolvedValue(mockUser)

    renderWithProviders()

    await waitFor(() => {
      expect(screen.getByText('Grace Effiom')).toBeInTheDocument()
      expect(screen.getByText('LSQ001')).toBeInTheDocument()
      expect(screen.getByText('₦200000.00')).toBeInTheDocument()
    })
  })

  it('should display personal information section', async () => {
    vi.mocked(userService.getUserById).mockResolvedValue(mockUser)

    renderWithProviders()

    await waitFor(() => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument()
      expect(screen.getByText('grace@lendsqr.com')).toBeInTheDocument()
      expect(screen.getByText('Female')).toBeInTheDocument()
    })
  })

  it('should display guarantor information', async () => {
    vi.mocked(userService.getUserById).mockResolvedValue(mockUser)

    renderWithProviders()

    await waitFor(() => {
      expect(screen.getByText('Guarantor 1')).toBeInTheDocument()
      expect(screen.getByText('Debby Ogana')).toBeInTheDocument()
      expect(screen.getByText('Sister')).toBeInTheDocument()
    })
  })

  it('should cache user data in localStorage', async () => {
    vi.mocked(userService.getUserById).mockResolvedValue(mockUser)

    renderWithProviders()

    await waitFor(() => {
      expect(screen.getByText('Grace Effiom')).toBeInTheDocument()
    })

    // Check if user was cached in localStorage
    const cached = localStorage.getItem('user_LSQ001')
    expect(cached).toBeTruthy()
    if (cached) {
      const parsedUser = JSON.parse(cached)
      expect(parsedUser.id).toBe('LSQ001')
    }
  })

  it('should show error message on fetch failure', async () => {
    vi.mocked(userService.getUserById).mockRejectedValue(new Error('Failed to fetch'))

    renderWithProviders()

    await waitFor(() => {
      expect(screen.getByText('Failed to load user details')).toBeInTheDocument()
    })
  })
})

