/**
 * Authentication Context
 * Manages user authentication state using React Context API
 * 
 * Architecture Decision:
 * - Simple Context API is sufficient for auth state (login/logout)
 * - Persists auth token in localStorage
 * - TanStack Query handles all server state separately
 */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AUTH_TOKEN_KEY = 'lendsqr_auth_token'
const USER_EMAIL_KEY = 'lendsqr_user_email'

/**
 * AuthProvider component
 * Wraps the app to provide authentication context
 */
export function AuthProvider({ children }: { children: ReactNode }) {
  // Initialize auth state synchronously from localStorage
  // This prevents flash of "not authenticated" on page refresh and fixes test timing issues
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const email = localStorage.getItem(USER_EMAIL_KEY)
    return !!(token && email)
  })
  
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    return localStorage.getItem(USER_EMAIL_KEY)
  })

  // Keep useEffect for edge cases (e.g., localStorage changes from other tabs)
  // But primary initialization happens synchronously above
  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY)
    const email = localStorage.getItem(USER_EMAIL_KEY)
    
    if (token && email) {
      setIsAuthenticated(true)
      setUserEmail(email)
    } else {
      setIsAuthenticated(false)
      setUserEmail(null)
    }
  }, [])

  /**
   * Login function
   * In a real app, this would call an API endpoint
   * For this assessment, we accept any valid email/password combination
   * 
   * @param email - User email address
   * @param password - User password
   * @returns Promise<boolean> - Success status
   */
  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Simple validation for demo purposes
    // In production, this would validate against backend
    if (email && password.length >= 6) {
      // Generate mock token
      const mockToken = btoa(`${email}:${Date.now()}`)
      
      // Store in localStorage
      localStorage.setItem(AUTH_TOKEN_KEY, mockToken)
      localStorage.setItem(USER_EMAIL_KEY, email)
      
      // Update state
      setIsAuthenticated(true)
      setUserEmail(email)
      
      return true
    }
    
    return false
  }

  /**
   * Logout function
   * Clears authentication state and localStorage
   */
  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY)
    localStorage.removeItem(USER_EMAIL_KEY)
    setIsAuthenticated(false)
    setUserEmail(null)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/**
 * Custom hook to use auth context
 * Throws error if used outside of AuthProvider
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  
  return context
}

