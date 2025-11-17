/**
 * Sidebar Component
 * Main navigation sidebar for the dashboard
 * Based on Figma design
 */

import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        {/* Logo */}
        <div className={styles.logo}>
          <span className={styles.logoText}>lendsqr</span>
        </div>

        {/* Organization Switcher */}
        <div className={styles.orgSwitcher}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 0L0 8L8 16L16 8L8 0Z" fill="#213F7D" opacity="0.8"/>
          </svg>
          <span>Switch Organization</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.dropdown}>
            <path d="M7 10L2 5H12L7 10Z" fill="#213F7D"/>
          </svg>
        </div>

        {/* Dashboard Link */}
        <NavLink to="/dashboard" className={styles.dashboardLink}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <rect width="16" height="16" rx="2" fill="currentColor" opacity="0.8"/>
          </svg>
          <span>Dashboard</span>
        </NavLink>

        {/* Navigation Sections */}
        <nav className={styles.nav}>
          {/* CUSTOMERS Section */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>CUSTOMERS</h3>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
              }
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Users</span>
            </NavLink>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Guarantors</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Loans</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Decision Models</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Savings</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Loan Requests</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Whitelist</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Karma</span>
            </div>
          </div>

          {/* BUSINESSES Section */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>BUSINESSES</h3>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Organization</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Loan Products</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Savings Products</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Fees and Charges</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Transactions</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Services</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Service Account</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Settlements</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Reports</span>
            </div>
          </div>

          {/* SETTINGS Section */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>SETTINGS</h3>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Preferences</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Fees and Pricing</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Audit Logs</span>
            </div>
            <div className={styles.navLink}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span>Systems Messages</span>
            </div>
          </div>
        </nav>

        {/* Logout and Version */}
        <div className={styles.sidebarFooter}>
          <button className={styles.logoutButton}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 14H3C2.44772 14 2 13.5523 2 13V3C2 2.44772 2.44772 2 3 2H6" stroke="currentColor" strokeWidth="2"/>
              <path d="M11 11L14 8L11 5" stroke="currentColor" strokeWidth="2"/>
              <path d="M14 8H6" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span>Logout</span>
          </button>
          <div className={styles.version}>v1.2.0</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

