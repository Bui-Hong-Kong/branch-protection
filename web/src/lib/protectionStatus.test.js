import { describe, expect, it } from 'vitest'
import {
  REQUIRED_GATES,
  countGatesByKind,
  readinessLabel,
  summarizeMergeReadiness,
} from './protectionStatus'

describe('protectionStatus', () => {
  it('lists every required merge-queue gate', () => {
    expect(REQUIRED_GATES).toHaveLength(7)
    expect(REQUIRED_GATES.map((gate) => gate.id)).toEqual([
      'codeql',
      'guard',
      'lint',
      'build',
      'audit',
      'test',
      'osv',
    ])
  })

  it('counts gates by kind', () => {
    expect(countGatesByKind(REQUIRED_GATES, 'security')).toBe(3)
    expect(countGatesByKind(REQUIRED_GATES, 'quality')).toBe(3)
    expect(countGatesByKind(REQUIRED_GATES, 'policy')).toBe(1)
  })

  it('returns pending when results are missing', () => {
    expect(summarizeMergeReadiness([])).toBe('pending')
    expect(summarizeMergeReadiness(undefined)).toBe('pending')
  })

  it('returns blocked when any required gate failed', () => {
    const results = REQUIRED_GATES.map((gate) => ({
      id: gate.id,
      status: gate.id === 'lint' ? 'fail' : 'pass',
    }))
    expect(summarizeMergeReadiness(results)).toBe('blocked')
    expect(readinessLabel('blocked')).toMatch(/blocked/i)
  })

  it('returns ready only when every required gate passed', () => {
    const results = REQUIRED_GATES.map((gate) => ({
      id: gate.id,
      status: 'pass',
    }))
    expect(summarizeMergeReadiness(results)).toBe('ready')
    expect(readinessLabel('ready')).toMatch(/merge queue/i)
  })

  it('returns pending when some gates are still running', () => {
    const results = REQUIRED_GATES.map((gate) => ({
      id: gate.id,
      status: gate.id === 'osv' ? 'pending' : 'pass',
    }))
    expect(summarizeMergeReadiness(results)).toBe('pending')
    expect(readinessLabel('pending')).toMatch(/waiting/i)
  })
})
