/**
 * Login Page Component
 * Implements pixel-perfect login UI from Figma
 * Features: Email/password validation, password toggle, responsive layout
 */

import React, { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/auth-context'
import { Button, Input } from '@/components/common'
import styles from './Login.module.scss'
import logoIcon from '@/assets/icons/Lendsqr-logo.svg'
import illustrationIcon from '@/assets/icons/login-illustration.svg'

/**
 * Login page component
 * Authenticates users and redirects to dashboard
 */
const Login: React.FC = () => {
  const navigate = useNavigate()
  const { login, isAuthenticated } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  /**
   * Validates email format using regex
   */
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  /**
   * Validates form fields
   * Returns true if validation passes
   */
  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {}

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Password validation
    if (!password) {
      newErrors.password = 'Password is required'
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Clear previous errors
    setErrors({})

    // Validate form
    if (!validateForm()) {
      return
    }

    // Attempt login
    setIsLoading(true)
    try {
      const success = await login(email, password)
      
      if (success) {
        navigate('/dashboard')
      } else {
        setErrors({ password: 'Invalid credentials' })
      }
    } catch (error) {
      setErrors({ password: 'Login failed. Please try again.' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={styles.loginPage}>
      {/* Left side - Illustration */}
      <div className={styles.leftSection}>
        <div className={styles.logoContainer}>
          <img 
            src={logoIcon} 
            alt="Lendsqr" 
            className={styles.logoImage}
          />
        </div>
        
        <div className={styles.illustration}>
          <img 
            src={illustrationIcon} 
            alt="Lendsqr illustration" 
            className={styles.illustrationImage}
          />
        </div>
      </div>

      {/* Right side - Login form */}
      <div className={styles.rightSection}>
        <div className={styles.formContainer}>
          {/* Mobile Logo - shown only on mobile */}
          <div className={styles.mobileLogoContainer}>
            <img 
              src={logoIcon} 
              alt="Lendsqr" 
              className={styles.logoImage}
            />
          </div>
          
          <div className={styles.formHeader}>
            <h1 className={styles.title}>Welcome!</h1>
            <p className={styles.subtitle}>Enter details to login.</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form} noValidate>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              fullWidth
              autoComplete="email"
              aria-required="true"
            />

            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              fullWidth
              showPasswordToggle
              autoComplete="current-password"
              aria-required="true"
            />

            <a href="#" className={styles.forgotPassword}>
              FORGOT PASSWORD?
            </a>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              loading={isLoading}
              disabled={isLoading}
            >
              LOG IN
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login

