/**
 * Sidebar Component
 * Main navigation sidebar for the dashboard
 * Based on Figma design
 */

import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import styles from './Sidebar.module.scss'
import logoIcon from '@/assets/icons/Lendsqr-logo.svg'
import organizationIcon from '@/assets/icons/sidebar-icons/organization.svg'
import dashboardIcon from '@/assets/icons/sidebar-icons/dashboard.svg'
import usersIcon from '@/assets/icons/sidebar-icons/users.svg'
import guarantorsIcon from '@/assets/icons/sidebar-icons/guarantors.svg'
import loansIcon from '@/assets/icons/sidebar-icons/loans.svg'
import decisionModelsIcon from '@/assets/icons/sidebar-icons/decision-models.svg'
import savingsIcon from '@/assets/icons/sidebar-icons/savings.svg'
import loanRequestsIcon from '@/assets/icons/sidebar-icons/loan-requests.svg'
import whitelistIcon from '@/assets/icons/sidebar-icons/whitelist.svg'
import karmaIcon from '@/assets/icons/sidebar-icons/karma.svg'
import loanProductsIcon from '@/assets/icons/sidebar-icons/loan-products.svg'
import savingsProductsIcon from '@/assets/icons/sidebar-icons/savings-products.svg'
import feesIcon from '@/assets/icons/sidebar-icons/fees.svg'
import transactionsIcon from '@/assets/icons/sidebar-icons/transactions.svg'
import servicesIcon from '@/assets/icons/sidebar-icons/services.svg'
import serviceAccountIcon from '@/assets/icons/sidebar-icons/service-account.svg'
import settlementsIcon from '@/assets/icons/sidebar-icons/settlements.svg'
import reportsIcon from '@/assets/icons/sidebar-icons/reports.svg'
import preferencesIcon from '@/assets/icons/sidebar-icons/preferences.svg'
import feesAndPricingIcon from '@/assets/icons/sidebar-icons/fees-and-pricing.svg'
import auditIcon from '@/assets/icons/sidebar-icons/audit.svg'
import systemMsgsIcon from '@/assets/icons/sidebar-icons/system-msgs.svg'
import logoutIcon from '@/assets/icons/sidebar-icons/logout.svg'
import { useAuth } from '@/store/auth-context'

const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  /**
   * Handles logout by clearing auth context then redirecting to login.
   * Rationale: keeps auth logic centralized in context while ensuring UX
   * instantly returns to the protected entry point after state reset.
   */
  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarInner}>
        {/* Logo */}
        <div className={styles.logo}>
          <img 
            src={logoIcon} 
            alt="Lendsqr" 
            className={styles.logoImage}
          />
        </div>

        {/* Organization Switcher */}
        <div className={styles.orgSwitcher}>
          <img src={organizationIcon} alt="" className={styles.orgIcon} />
          <span>Switch Organization</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className={styles.dropdown}>
            <path d="M7 10L2 5H12L7 10Z" fill="#213F7D"/>
          </svg>
        </div>

        {/* Dashboard Link */}
        <NavLink to="/dashboard" className={styles.dashboardLink}>
          <img src={dashboardIcon} alt="" className={styles.navIcon} />
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
              <img src={usersIcon} alt="" className={styles.navIcon} />
              <span>Users</span>
            </NavLink>
            <div className={styles.navLink}>
              <img src={guarantorsIcon} alt="" className={styles.navIcon} />
              <span>Guarantors</span>
            </div>
            <div className={styles.navLink}>
              <img src={loansIcon} alt="" className={styles.navIcon} />
              <span>Loans</span>
            </div>
            <div className={styles.navLink}>
              <img src={decisionModelsIcon} alt="" className={styles.navIcon} />
              <span>Decision Models</span>
            </div>
            <div className={styles.navLink}>
              <img src={savingsIcon} alt="" className={styles.navIcon} />
              <span>Savings</span>
            </div>
            <div className={styles.navLink}>
              <img src={loanRequestsIcon} alt="" className={styles.navIcon} />
              <span>Loan Requests</span>
            </div>
            <div className={styles.navLink}>
              <img src={whitelistIcon} alt="" className={styles.navIcon} />
              <span>Whitelist</span>
            </div>
            <div className={styles.navLink}>
              <img src={karmaIcon} alt="" className={styles.navIcon} />
              <span>Karma</span>
            </div>
          </div>

          {/* BUSINESSES Section */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>BUSINESSES</h3>
            <div className={styles.navLink}>
              <img src={organizationIcon} alt="" className={styles.navIcon} />
              <span>Organization</span>
            </div>
            <div className={styles.navLink}>
              <img src={loanProductsIcon} alt="" className={styles.navIcon} />
              <span>Loan Products</span>
            </div>
            <div className={styles.navLink}>
              <img src={savingsProductsIcon} alt="" className={styles.navIcon} />
              <span>Savings Products</span>
            </div>
            <div className={styles.navLink}>
              <img src={feesIcon} alt="" className={styles.navIcon} />
              <span>Fees and Charges</span>
            </div>
            <div className={styles.navLink}>
              <img src={transactionsIcon} alt="" className={styles.navIcon} />
              <span>Transactions</span>
            </div>
            <div className={styles.navLink}>
              <img src={servicesIcon} alt="" className={styles.navIcon} />
              <span>Services</span>
            </div>
            <div className={styles.navLink}>
              <img src={serviceAccountIcon} alt="" className={styles.navIcon} />
              <span>Service Account</span>
            </div>
            <div className={styles.navLink}>
              <img src={settlementsIcon} alt="" className={styles.navIcon} />
              <span>Settlements</span>
            </div>
            <div className={styles.navLink}>
              <img src={reportsIcon} alt="" className={styles.navIcon} />
              <span>Reports</span>
            </div>
          </div>

          {/* SETTINGS Section */}
          <div className={styles.navSection}>
            <h3 className={styles.sectionTitle}>SETTINGS</h3>
            <div className={styles.navLink}>
              <img src={preferencesIcon} alt="" className={styles.navIcon} />
              <span>Preferences</span>
            </div>
            <div className={styles.navLink}>
              <img src={feesAndPricingIcon} alt="" className={styles.navIcon} />
              <span>Fees and Pricing</span>
            </div>
            <div className={styles.navLink}>
              <img src={auditIcon} alt="" className={styles.navIcon} />
              <span>Audit Logs</span>
            </div>
            <div className={styles.navLink}>
              <img src={systemMsgsIcon} alt="" className={styles.navIcon} />
              <span>Systems Messages</span>
            </div>
          </div>
        </nav>

        {/* Logout and Version */}
        <div className={styles.sidebarFooter}>
          <button 
            type="button" 
            className={styles.logoutButton}
            onClick={handleLogout}
            aria-label="Logout"
          >
            <img src={logoutIcon} alt="" className={styles.navIcon} />
            <span>Logout</span>
          </button>
          <div className={styles.version}>v1.2.0</div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

