/**
 * DashboardLayout Component
 * Wraps pages with Sidebar and Header
 * Manages mobile menu state for hamburger navigation
 */

import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/store/auth-context'
import Sidebar from '../Sidebar/Sidebar'
import Header from '../Header/Header'
import styles from './DashboardLayout.module.scss'

interface DashboardLayoutProps {
  children: React.ReactNode
}

/**
 * Layout wrapper for authenticated dashboard pages
 * Includes Sidebar, Header, and main content area
 * Manages mobile sidebar visibility state
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      <div className={styles.mainWrapper}>
        <Header onMenuToggle={toggleMobileMenu} />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout

