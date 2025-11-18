/**
 * Header Component
 * Top navigation bar with search and user profile
 * Includes hamburger menu trigger for mobile navigation
 */

import React, { useState } from 'react'
import { useAuth } from '@/store/auth-context'
import styles from './Header.module.scss'
import avatarIcon from '@/assets/icons/avatar.png'
import notificationBellIcon from '@/assets/icons/notification-bell.svg'

interface HeaderProps {
  onMenuToggle: () => void
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { userEmail } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search logic
    console.log('Search:', searchQuery)
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Hamburger Menu Button (Mobile Only) */}
        <button 
          className={styles.hamburgerButton}
          onClick={onMenuToggle}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerIcon}></span>
        </button>

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
            <img src={notificationBellIcon} alt="" className={styles.notificationIcon} />
            <span className={styles.notificationBadge}>3</span>
          </button>

          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img 
                src={avatarIcon} 
                alt={userEmail || 'User'} 
                className={styles.avatarImage}
              />
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

