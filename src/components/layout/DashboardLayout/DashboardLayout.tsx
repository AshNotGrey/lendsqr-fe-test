/**
 * DashboardLayout Component
 * Wraps pages with Sidebar and Header
 */

import React from 'react'
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
 */
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth()

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className={styles.dashboardLayout}>
      <Sidebar />
      <div className={styles.mainWrapper}>
        <Header />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  )
}

export default DashboardLayout

