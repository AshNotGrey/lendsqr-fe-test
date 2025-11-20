/**
 * User Service Tests
 * Tests API functions and pagination
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getUsers, getUserById, paginateUsers } from './user.service'
import { createMockUser } from '@/test/test-utils'

// Mock fetch globally
globalThis.fetch = vi.fn() as typeof fetch

describe('User Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getUsers', () => {
    it('should fetch and return users from Gist', async () => {
      const mockUsers = [createMockUser(), createMockUser({ id: 'LSQ002' })]
      
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)

      const users = await getUsers()

      expect(users).toHaveLength(2)
      expect(users[0].id).toBe('LSQ001')
      expect(fetch).toHaveBeenCalled()
    })

    it('should fallback to local JSON when Gist fails', async () => {
      const mockUsers = [createMockUser()]
      
      // First call fails (Gist)
      vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))
      
      // Second call succeeds (local)
      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)

      const users = await getUsers()

      expect(users).toHaveLength(1)
      expect(fetch).toHaveBeenCalledTimes(2)
    })

    it('should throw error when all sources fail', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await expect(getUsers()).rejects.toThrow('Unable to fetch user data from any source')
    })

    it('should normalize user data correctly', async () => {
      const rawUser = {
        id: 'TEST001',
        organization: 'Test Org',
        username: 'testuser',
        email: 'test@example.com',
        phoneNumber: '1234567890',
        dateJoined: '2020-01-01T00:00:00Z',
        status: 'Active',
        fullName: 'Test User',
        accountBalance: 1000.5, // Number instead of string
        userTier: 2,
      }

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => [rawUser],
      } as Response)

      const users = await getUsers()

      expect(users[0].accountBalance).toBe('1000.50') // Should be string
      expect(users[0].id).toBe('TEST001')
      expect(users[0].userTier).toBe(2)
    })
  })

  describe('getUserById', () => {
    it('should fetch single user by ID', async () => {
      const mockUsers = [
        createMockUser({ id: 'LSQ001' }),
        createMockUser({ id: 'LSQ002', username: 'user2' }),
      ]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)

      const user = await getUserById('LSQ002')

      expect(user).not.toBeNull()
      expect(user?.id).toBe('LSQ002')
      expect(user?.username).toBe('user2')
    })

    it('should return null when user not found', async () => {
      const mockUsers = [createMockUser({ id: 'LSQ001' })]

      vi.mocked(fetch).mockResolvedValueOnce({
        ok: true,
        json: async () => mockUsers,
      } as Response)

      const user = await getUserById('NONEXISTENT')

      expect(user).toBeNull()
    })

    it('should throw error when fetch fails', async () => {
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await expect(getUserById('LSQ001')).rejects.toThrow()
    })
  })

  describe('paginateUsers', () => {
    it('should correctly paginate array', () => {
      const users = Array.from({ length: 25 }, (_, i) =>
        createMockUser({ id: `LSQ${String(i + 1).padStart(3, '0')}` })
      )

      const result = paginateUsers(users, 1, 10)

      expect(result.users).toHaveLength(10)
      expect(result.pagination.page).toBe(1)
      expect(result.pagination.pageSize).toBe(10)
      expect(result.pagination.total).toBe(25)
      expect(result.pagination.totalPages).toBe(3)
      expect(result.pagination.hasNext).toBe(true)
      expect(result.pagination.hasPrev).toBe(false)
    })

    it('should return correct page', () => {
      const users = Array.from({ length: 25 }, (_, i) =>
        createMockUser({ id: `LSQ${String(i + 1).padStart(3, '0')}` })
      )

      const result = paginateUsers(users, 2, 10)

      expect(result.users).toHaveLength(10)
      expect(result.pagination.page).toBe(2)
      expect(result.pagination.hasPrev).toBe(true)
      expect(result.pagination.hasNext).toBe(true)
    })

    it('should handle last page correctly', () => {
      const users = Array.from({ length: 25 }, (_, i) =>
        createMockUser({ id: `LSQ${String(i + 1).padStart(3, '0')}` })
      )

      const result = paginateUsers(users, 3, 10)

      expect(result.users).toHaveLength(5)
      expect(result.pagination.page).toBe(3)
      expect(result.pagination.hasNext).toBe(false)
      expect(result.pagination.hasPrev).toBe(true)
    })

    it('should handle empty array', () => {
      const result = paginateUsers([], 1, 10)

      expect(result.users).toHaveLength(0)
      expect(result.pagination.total).toBe(0)
      expect(result.pagination.totalPages).toBe(0)
      expect(result.pagination.hasNext).toBe(false)
      expect(result.pagination.hasPrev).toBe(false)
    })

    it('should handle page size larger than array', () => {
      const users = Array.from({ length: 5 }, (_, i) =>
        createMockUser({ id: `LSQ${String(i + 1).padStart(3, '0')}` })
      )

      const result = paginateUsers(users, 1, 10)

      expect(result.users).toHaveLength(5)
      expect(result.pagination.totalPages).toBe(1)
    })
  })
})

