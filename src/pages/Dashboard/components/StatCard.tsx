/**
 * StatCard Component
 * Displays statistics with icon and label
 */

import React from 'react'
import styles from './StatCard.module.scss'
import usersPinkIcon from '@/assets/icons/users-pink.svg'
import activeUsersIcon from '@/assets/icons/active-users.svg'
import usersWithLoansIcon from '@/assets/icons/users-with-loans.svg'
import usersWithSavingsIcon from '@/assets/icons/users-with-savings.svg'

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
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return usersPinkIcon
      case 'active-users':
        return activeUsersIcon
      case 'loans':
        return usersWithLoansIcon
      case 'savings':
        return usersWithSavingsIcon
      default:
        return usersPinkIcon
    }
  }

  return (
    <div className={styles.statCard}>
      <div className={`${styles.iconWrapper} ${styles[`iconWrapper--${color}`]}`}>
        <img src={getIcon()} alt="" className={styles.iconImage} />
      </div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value}>{value}</p>
    </div>
  )
}

export default StatCard

