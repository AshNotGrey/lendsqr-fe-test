/**
 * Input Component
 * Reusable form input with validation states and password toggle
 */

import React, { InputHTMLAttributes, useState } from 'react'
import styles from './Input.module.scss'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
  showPasswordToggle?: boolean
}

/**
 * Input component with label, error handling, and password toggle
 * Implements design system from Figma
 * 
 * @example
 * <Input 
 *   label="Email"
 *   type="email"
 *   error="Invalid email"
 *   value={email}
 *   onChange={handleChange}
 * />
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  showPasswordToggle = false,
  type = 'text',
  className = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false)
  
  const isPasswordType = type === 'password' || showPasswordToggle
  const inputType = isPasswordType && showPassword ? 'text' : type

  const inputClasses = [
    styles.input,
    error && styles['input--error'],
    fullWidth && styles['input--full-width'],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label} htmlFor={props.id || props.name}>
          {label}
        </label>
      )}
      
      <div className={styles.inputContainer}>
        <input
          type={inputType}
          className={inputClasses}
          aria-invalid={!!error}
          aria-describedby={error ? `${props.id}-error` : undefined}
          {...props}
        />
        
        {isPasswordType && (
          <button
            type="button"
            className={styles.toggleButton}
            onClick={() => setShowPassword(!showPassword)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? 'HIDE' : 'SHOW'}
          </button>
        )}
      </div>
      
      {error && (
        <span
          className={styles.error}
          id={`${props.id}-error`}
          role="alert"
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default Input

