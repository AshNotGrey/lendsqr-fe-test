/**
 * StatusBadge Component Tests
 * Tests rendering and styling for all status types
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import StatusBadge from './StatusBadge'

describe('StatusBadge Component', () => {
  // Positive tests
  it('should render Active status', () => {
    render(<StatusBadge status="Active" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveTextContent('Active')
    expect(badge).toHaveClass('badge--active')
  })

  it('should render Inactive status', () => {
    render(<StatusBadge status="Inactive" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveTextContent('Inactive')
    expect(badge).toHaveClass('badge--inactive')
  })

  it('should render Pending status', () => {
    render(<StatusBadge status="Pending" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveTextContent('Pending')
    expect(badge).toHaveClass('badge--pending')
  })

  it('should render Blacklisted status', () => {
    render(<StatusBadge status="Blacklisted" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveTextContent('Blacklisted')
    expect(badge).toHaveClass('badge--blacklisted')
  })

  it('should have accessible aria-label', () => {
    render(<StatusBadge status="Active" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveAttribute('aria-label', 'Status: Active')
  })

  it('should apply base badge class', () => {
    render(<StatusBadge status="Active" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveClass('badge')
  })

  it('should apply custom className', () => {
    render(<StatusBadge status="Active" className="custom-class" />)
    const badge = screen.getByRole('status')
    expect(badge).toHaveClass('custom-class')
    expect(badge).toHaveClass('badge')
  })

  // Test all status variants systematically
  it('should render all status variants correctly', () => {
    const statuses: Array<'Active' | 'Inactive' | 'Pending' | 'Blacklisted'> = [
      'Active',
      'Inactive',
      'Pending',
      'Blacklisted',
    ]

    statuses.forEach(status => {
      const { container } = render(<StatusBadge status={status} />)
      const badge = container.querySelector(`.badge--${status.toLowerCase()}`)
      expect(badge).toBeInTheDocument()
      expect(badge).toHaveTextContent(status)
    })
  })
})

