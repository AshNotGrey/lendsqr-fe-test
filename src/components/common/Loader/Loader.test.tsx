/**
 * Loader Component Tests
 */

import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Loader from './Loader'

describe('Loader Component', () => {
  it('should render loader', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('should render with medium size by default', () => {
    render(<Loader />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('loader--medium')
  })

  it('should render with small size', () => {
    render(<Loader size="small" />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('loader--small')
  })

  it('should render with large size', () => {
    render(<Loader size="large" />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('loader--large')
  })

  it('should have accessible label', () => {
    render(<Loader />)
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading')
  })

  it('should render full screen when fullScreen prop is true', () => {
    const { container } = render(<Loader fullScreen />)
    expect(container.querySelector('.fullScreen')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    render(<Loader className="custom-loader" />)
    const loader = screen.getByRole('status')
    expect(loader).toHaveClass('custom-loader')
  })
})

