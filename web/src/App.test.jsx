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

  it('shows the branch protection gates panel', () => {
    render(<App />)
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
