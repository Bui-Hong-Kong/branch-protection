import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ProtectionPanel from './ProtectionPanel'

describe('ProtectionPanel', () => {
  it('renders the protection heading and all gate labels', () => {
    render(<ProtectionPanel />)

    expect(
      screen.getByRole('heading', { name: /branch protection gates/i }),
    ).toBeInTheDocument()
    expect(screen.getByText(/ready for merge queue/i)).toBeInTheDocument()
    expect(screen.getByText('Analyze (javascript)')).toBeInTheDocument()
    expect(screen.getByText('Gitleaks')).toBeInTheDocument()
    expect(screen.getByText('Guard config')).toBeInTheDocument()
  })
})
