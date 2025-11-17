/**
 * Button Component
 * Reusable button with multiple variants
 * Implements design system from Figma
 */

import React, { ButtonHTMLAttributes } from 'react'
import styles from './Button.module.scss'

export type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'danger'
export type ButtonSize = 'small' | 'medium' | 'large'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  loading?: boolean
  children: React.ReactNode
}

/**
 * Button component with multiple variants and sizes
 * Supports loading state and full-width option
 * 
 * @example
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button--${variant}`],
    styles[`button--${size}`],
    fullWidth && styles['button--full-width'],
    loading && styles['button--loading'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <span className={styles.spinner} />
          <span className={styles.loadingText}>{children}</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}

export default Button

