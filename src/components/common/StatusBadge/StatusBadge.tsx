/**
 * StatusBadge Component
 * Displays user status with appropriate color coding
 * Based on Figma design specifications
 */

import React from 'react'
import type { UserStatus } from '@/types/user.types'
import styles from './StatusBadge.module.scss'

export interface StatusBadgeProps {
  status: UserStatus
  className?: string
}

/**
 * StatusBadge component
 * Renders a colored badge for user status
 * Colors: Active (green), Inactive (gray), Pending (yellow), Blacklisted (red)
 * 
 * @example
 * <StatusBadge status="Active" />
 */
const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const badgeClasses = [
    styles.badge,
    styles[`badge--${status.toLowerCase()}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <span className={badgeClasses} role="status" aria-label={`Status: ${status}`}>
      {status}
    </span>
  )
}

export default StatusBadge

