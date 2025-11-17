/**
 * FilterPopup Component
 * Filter form for users table
 * Based on Figma "Users - showing filters.png"
 */

import React, { useState } from 'react'
import { Button } from '@/components/common'
import type { IUserFilters, UserStatus } from '@/types/user.types'
import styles from './FilterPopup.module.scss'

export interface FilterPopupProps {
  onFilter: (filters: IUserFilters) => void
  onReset: () => void
  onClose: () => void
}

/**
 * FilterPopup component
 * Allows filtering users by multiple criteria
 */
const FilterPopup: React.FC<FilterPopupProps> = ({ onFilter, onReset, onClose }) => {
  const [filters, setFilters] = useState<IUserFilters>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({})
    onReset()
  }

  const handleChange = (field: keyof IUserFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value || undefined,
    }))
  }

  return (
    <>
      <div className={styles.backdrop} onClick={onClose} />
      <div className={styles.filterPopup}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="filter-organization" className={styles.label}>
              Organization
            </label>
            <select
              id="filter-organization"
              className={styles.select}
              value={filters.organization || ''}
              onChange={(e) => handleChange('organization', e.target.value)}
            >
              <option value="">Select</option>
              <option value="Lendsqr">Lendsqr</option>
              <option value="Irorun">Irorun</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="filter-username" className={styles.label}>
              Username
            </label>
            <input
              id="filter-username"
              type="text"
              className={styles.input}
              placeholder="User"
              value={filters.username || ''}
              onChange={(e) => handleChange('username', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="filter-email" className={styles.label}>
              Email
            </label>
            <input
              id="filter-email"
              type="email"
              className={styles.input}
              placeholder="Email"
              value={filters.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="filter-date" className={styles.label}>
              Date
            </label>
            <input
              id="filter-date"
              type="date"
              className={styles.input}
              value={filters.date || ''}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="filter-phone" className={styles.label}>
              Phone Number
            </label>
            <input
              id="filter-phone"
              type="tel"
              className={styles.input}
              placeholder="Phone Number"
              value={filters.phoneNumber || ''}
              onChange={(e) => handleChange('phoneNumber', e.target.value)}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="filter-status" className={styles.label}>
              Status
            </label>
            <select
              id="filter-status"
              className={styles.select}
              value={filters.status || ''}
              onChange={(e) => handleChange('status', e.target.value as UserStatus)}
            >
              <option value="">Select</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Pending">Pending</option>
              <option value="Blacklisted">Blacklisted</option>
            </select>
          </div>

          <div className={styles.buttonGroup}>
            <Button type="button" variant="outline" onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Filter
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}

export default FilterPopup

