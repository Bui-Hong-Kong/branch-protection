import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the get started heading', () => {
    render(<App />)
    expect(
      screen.getByRole('heading', { name: /get started/i }),
    ).toBeInTheDocument()
  })

  it('shows the dev-1 protection demo banner and gate panel', () => {
    render(<App />)
    expect(screen.getByText(/dev-1 · protection checklist demo/i)).toBeInTheDocument()
    expect(
      screen.getByRole('heading', { name: /branch protection gates/i }),
    ).toBeInTheDocument()
  })

  it('increments the counter when clicked', async () => {
    const user = userEvent.setup()
    render(<App />)
    const button = screen.getByRole('button', { name: /count is/i })
    await user.click(button)
    expect(button).toHaveTextContent('Count is 1')
  })
})
