/**
 * Dashboard Page (Users List)
 * Main dashboard showing users table with filtering and pagination
 * Based on Figma "Dashboard.png" and "Users - showing filters.png"
 */

import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout'
import { Loader } from '@/components/common'
import { getUsers, paginateUsers } from '@/services/user.service'
import type { IUserFilters } from '@/types/user.types'
import StatCard from './components/StatCard'
import UsersTable from './components/UsersTable'
import FilterPopup from './components/FilterPopup'
import Pagination from './components/Pagination'
import styles from './Dashboard.module.scss'

/**
 * Dashboard page component
 * Displays user statistics and paginated users table
 */
const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState<IUserFilters>({})
  const [showFilterPopup, setShowFilterPopup] = useState(false)

  // Fetch users using React Query
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })

  // Calculate statistics
  const stats = React.useMemo(() => {
    return {
      totalUsers: users.length,
      activeUsers: users.filter(u => u.status === 'Active').length,
      usersWithLoans: users.filter(u => u.educationAndEmployment.loanRepayment !== '0').length,
      usersWithSavings: users.filter(u => parseFloat(u.accountBalance) > 0).length,
    }
  }, [users])

  // Apply filters
  const filteredUsers = React.useMemo(() => {
    if (Object.keys(filters).length === 0) return users

    return users.filter(user => {
      if (filters.organization && !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) {
        return false
      }
      if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
        return false
      }
      if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
        return false
      }
      if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
        return false
      }
      if (filters.status && user.status !== filters.status) {
        return false
      }
      if (filters.date) {
        const userDate = user.dateJoined.split('T')[0]
        if (userDate !== filters.date) {
          return false
        }
      }
      return true
    })
  }, [users, filters])

  // Paginate users
  const paginatedData = React.useMemo(() => {
    return paginateUsers(filteredUsers, currentPage, pageSize)
  }, [filteredUsers, currentPage, pageSize])

  const handleFilterSubmit = (newFilters: IUserFilters) => {
    setFilters(newFilters)
    setCurrentPage(1) // Reset to first page when filters change
    setShowFilterPopup(false)
  }

  const handleResetFilters = () => {
    setFilters({})
    setCurrentPage(1)
    setShowFilterPopup(false)
  }

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`)
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className={styles.loadingContainer}>
          <Loader size="large" />
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>
            Failed to load users. Please try again later.
          </p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className={styles.dashboard}>
        <h1 className={styles.pageTitle}>Users</h1>

        {/* Statistics Cards */}
        <div className={styles.statsGrid}>
          <StatCard
            icon="users"
            label="USERS"
            value={stats.totalUsers.toLocaleString()}
            color="pink"
          />
          <StatCard
            icon="active-users"
            label="ACTIVE USERS"
            value={stats.activeUsers.toLocaleString()}
            color="purple"
          />
          <StatCard
            icon="loans"
            label="USERS WITH LOANS"
            value={stats.usersWithLoans.toLocaleString()}
            color="orange"
          />
          <StatCard
            icon="savings"
            label="USERS WITH SAVINGS"
            value={stats.usersWithSavings.toLocaleString()}
            color="red"
          />
        </div>

        {/* Users Table */}
        <div className={styles.tableCard}>
          <UsersTable
            users={paginatedData?.users || []}
            onUserClick={handleUserClick}
            onFilterClick={() => setShowFilterPopup(!showFilterPopup)}
          />

          {showFilterPopup && (
            <FilterPopup
              onFilter={handleFilterSubmit}
              onReset={handleResetFilters}
              onClose={() => setShowFilterPopup(false)}
            />
          )}

          <Pagination
            currentPage={currentPage}
            pageSize={pageSize}
            totalItems={filteredUsers.length}
            onPageChange={setCurrentPage}
            onPageSizeChange={(size) => {
              setPageSize(size)
              setCurrentPage(1)
            }}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard

