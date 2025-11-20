/**
 * Test Utilities
 * Shared helper functions for rendering components with providers
 */

import React from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/store/auth-context'
import type { IUser } from '@/types/user.types'

/**
 * Creates a test QueryClient with retry disabled for faster tests
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        cacheTime: 0,
      },
    },
  })

/**
 * Renders component with Router provider
 */
export function renderWithRouter(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    ...options,
  })
}

/**
 * Renders component with QueryClient provider
 */
export function renderWithQueryClient(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const queryClient = createTestQueryClient()
  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    ),
    ...options,
  })
}

/**
 * Renders component with Auth provider
 */
export function renderWithAuth(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, {
    wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>,
    ...options,
  })
}

/**
 * Renders component with all providers (Router, QueryClient, Auth)
 */
export function renderWithAllProviders(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  const queryClient = createTestQueryClient()
  return render(ui, {
    wrapper: ({ children }) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    ),
    ...options,
  })
}

/**
 * Mock user data factory
 * Creates mock user objects for testing
 */
export function createMockUser(overrides?: Partial<IUser>): IUser {
  const baseUser: IUser = {
    id: 'LSQ001',
    organization: 'Lendsqr',
    username: 'grace',
    email: 'grace@lendsqr.com',
    phoneNumber: '07060780922',
    dateJoined: '2020-05-15T10:00:00.000Z',
    status: 'Active',
    avatar: 'https://example.com/avatar.jpg',
    fullName: 'Grace Effiom',
    userTier: 1,
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

  return { ...baseUser, ...overrides }
}

/**
 * Creates an array of mock users
 */
export function createMockUsers(count: number, overrides?: Partial<IUser>[]): IUser[] {
  return Array.from({ length: count }, (_, index) =>
    createMockUser({
      id: `LSQ${String(index + 1).padStart(3, '0')}`,
      username: `user${index + 1}`,
      email: `user${index + 1}@example.com`,
      ...(overrides?.[index] || {}),
    })
  )
}

