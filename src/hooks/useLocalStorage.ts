/**
 * useLocalStorage Hook
 * Custom hook for managing localStorage with type safety
 * Used for caching user details on UserDetails page
 */

import { useState } from 'react'

/**
 * Custom hook for localStorage with automatic JSON serialization
 * 
 * @param key - localStorage key
 * @param initialValue - Initial value if key doesn't exist
 * @returns [storedValue, setValue] - Tuple similar to useState
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error, return initialValue
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      // Save state
      setStoredValue(valueToStore)
      
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue]
}

/**
 * Get item from localStorage
 * Utility function for one-off reads
 */
export function getFromLocalStorage<T>(key: string, defaultValue: T): T {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading from localStorage: ${key}`, error)
    return defaultValue
  }
}

/**
 * Set item in localStorage
 * Utility function for one-off writes
 */
export function setInLocalStorage<T>(key: string, value: T): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing to localStorage: ${key}`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeFromLocalStorage(key: string): boolean {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing from localStorage: ${key}`, error)
    return false
  }
}

