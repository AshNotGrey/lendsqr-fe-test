/**
 * Loader Component
 * Displays loading spinner for async operations
 */

import React from 'react'
import styles from './Loader.module.scss'

export interface LoaderProps {
  size?: 'small' | 'medium' | 'large'
  className?: string
  fullScreen?: boolean
}

/**
 * Loader component with different sizes
 * Can be rendered full-screen or inline
 * 
 * @example
 * <Loader size="medium" />
 */
const Loader: React.FC<LoaderProps> = ({
  size = 'medium',
  className = '',
  fullScreen = false,
}) => {
  const loaderClasses = [
    styles.loader,
    styles[`loader--${size}`],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={loaderClasses} role="status" aria-label="Loading">
      <div className={styles.spinner}></div>
      <span className="sr-only">Loading...</span>
    </div>
  )

  if (fullScreen) {
    return <div className={styles.fullScreen}>{content}</div>
  }

  return content
}

export default Loader

