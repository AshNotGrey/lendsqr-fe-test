/**
 * UsersTable Component
 * Displays users in a table with actions
 */

import React, { useState } from 'react'
import { StatusBadge } from '@/components/common'
import type { IUser } from '@/types/user.types'
import styles from './UsersTable.module.scss'

export interface UsersTableProps {
  users: IUser[]
  onUserClick: (userId: string) => void
  onFilterClick: () => void
}

/**
 * UsersTable component
 * Displays users with row actions and column filtering
 */
const UsersTable: React.FC<UsersTableProps> = ({
  users,
  onUserClick,
  onFilterClick,
}) => {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const handleMenuToggle = (userId: string) => {
    setActiveMenuId(activeMenuId === userId ? null : userId)
  }

  const handleViewDetails = (userId: string) => {
    onUserClick(userId)
    setActiveMenuId(null)
  }

  const handleBlacklist = (userId: string) => {
    console.log('Blacklist user:', userId)
    setActiveMenuId(null)
  }

  const handleActivate = (userId: string) => {
    console.log('Activate user:', userId)
    setActiveMenuId(null)
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>
              <div className={styles.columnHeader}>
                <span>ORGANIZATION</span>
                <button
                  className={styles.filterButton}
                  onClick={onFilterClick}
                  aria-label="Filter by organization"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>USERNAME</span>
                <button className={styles.filterButton} onClick={onFilterClick} aria-label="Filter by username">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>EMAIL</span>
                <button className={styles.filterButton} onClick={onFilterClick} aria-label="Filter by email">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>PHONE NUMBER</span>
                <button className={styles.filterButton} onClick={onFilterClick} aria-label="Filter by phone">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>DATE JOINED</span>
                <button className={styles.filterButton} onClick={onFilterClick} aria-label="Filter by date">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th>
              <div className={styles.columnHeader}>
                <span>STATUS</span>
                <button className={styles.filterButton} onClick={onFilterClick} aria-label="Filter by status">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                </button>
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.organization}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{formatDate(user.dateJoined)}</td>
              <td>
                <StatusBadge status={user.status} />
              </td>
              <td>
                <div className={styles.actionCell}>
                  <button
                    className={styles.actionButton}
                    onClick={() => handleMenuToggle(user.id)}
                    aria-label="User actions"
                    aria-expanded={activeMenuId === user.id}
                  >
                    <svg width="4" height="16" viewBox="0 0 4 16" fill="none">
                      <circle cx="2" cy="2" r="2" fill="currentColor"/>
                      <circle cx="2" cy="8" r="2" fill="currentColor"/>
                      <circle cx="2" cy="14" r="2" fill="currentColor"/>
                    </svg>
                  </button>
                  
                  {activeMenuId === user.id && (
                    <div className={styles.actionMenu}>
                      <button onClick={() => handleViewDetails(user.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3C4.5 3 1.5 6 1 8c.5 2 3.5 5 7 5s6.5-3 7-5c-.5-2-3.5-5-7-5z" stroke="currentColor"/>
                          <circle cx="8" cy="8" r="2" stroke="currentColor"/>
                        </svg>
                        View Details
                      </button>
                      <button onClick={() => handleBlacklist(user.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M2 2L14 14M14 2L2 14" stroke="currentColor"/>
                        </svg>
                        Blacklist User
                      </button>
                      <button onClick={() => handleActivate(user.id)}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l3 3L13 4" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                        Activate User
                      </button>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UsersTable

