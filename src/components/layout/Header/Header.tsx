/**
 * Header Component
 * Top navigation bar with search and user profile
 */

import React, { useState } from 'react'
import { useAuth } from '@/store/auth-context'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  const { userEmail } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Search:', searchQuery)
  }

  const getUserInitial = () => {
    return userEmail ? userEmail.charAt(0).toUpperCase() : 'U'
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Search Bar */}
        <form className={styles.searchForm} onSubmit={handleSearch}>
          <input
            type="search"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton} aria-label="Search">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="2"/>
              <path d="M9.5 9.5L12.5 12.5" stroke="white" strokeWidth="2"/>
            </svg>
          </button>
        </form>

        {/* Right section */}
        <div className={styles.rightSection}>
          <a href="#" className={styles.docsLink}>
            Docs
          </a>

          <button className={styles.notificationButton} aria-label="Notifications">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C7.24 2 5 4.24 5 7V10L3 12V13H17V12L15 10V7C15 4.24 12.76 2 10 2Z" fill="#213F7D"/>
              <path d="M10 18C10.5304 18 11.0391 17.7893 11.4142 17.4142C11.7893 17.0391 12 16.5304 12 16H8C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18Z" fill="#213F7D"/>
            </svg>
            <span className={styles.notificationBadge}>3</span>
          </button>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              {getUserInitial()}
            </div>
            <span className={styles.userName}>Adedeji</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className={styles.dropdown}>
              <path d="M6 8L2 4H10L6 8Z" fill="#213F7D"/>
            </svg>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

