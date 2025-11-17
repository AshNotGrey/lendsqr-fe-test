/**
 * StatCard Component
 * Displays statistics with icon and label
 */

import React from 'react'
import styles from './StatCard.module.scss'

export interface StatCardProps {
  icon: 'users' | 'active-users' | 'loans' | 'savings'
  label: string
  value: string | number
  color: 'pink' | 'purple' | 'orange' | 'red'
}

/**
 * StatCard component for displaying dashboard statistics
 */
const StatCard: React.FC<StatCardProps> = ({ icon, label, value, color }) => {
  return (
    <div className={styles.statCard}>
      <div className={`${styles.iconWrapper} ${styles[`iconWrapper--${color}`]}`}>
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          {icon === 'users' && (
            <g>
              <circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <circle cx="25" cy="12" r="5" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 30C5 25 9 22 15 22C21 22 25 25 25 30" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 30C15 25 19 22 25 22C31 22 35 25 35 30" stroke="currentColor" strokeWidth="2"/>
            </g>
          )}
          {icon === 'active-users' && (
            <g>
              <circle cx="20" cy="15" r="6" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 32C8 26 13 23 20 23C27 23 32 26 32 32" stroke="currentColor" strokeWidth="2"/>
              <circle cx="30" cy="10" r="3" fill="currentColor"/>
            </g>
          )}
          {icon === 'loans' && (
            <g>
              <rect x="8" y="10" width="24" height="20" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M15 10V7C15 5.89543 15.8954 5 17 5H23C24.1046 5 25 5.89543 25 7V10" stroke="currentColor" strokeWidth="2"/>
              <path d="M18 20H22" stroke="currentColor" strokeWidth="2"/>
            </g>
          )}
          {icon === 'savings' && (
            <g>
              <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M20 13V20L25 25" stroke="currentColor" strokeWidth="2"/>
            </g>
          )}
        </svg>
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default StatCard

