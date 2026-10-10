import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the get started heading', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /get started/i })).toBeInTheDocument()
  })

  it('shows the dev-2 banner', () => {
    render(<App />)
    expect(screen.getByText(/dev-2 · small ui tweak/i)).toBeInTheDocument()
  })
})
