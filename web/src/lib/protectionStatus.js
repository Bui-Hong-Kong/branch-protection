/**
 * Merge-gate checklist helpers for the branch-protection lab UI.
 * Pure functions keep CodeQL / unit tests focused on real JS logic.
 */

export const REQUIRED_GATES = Object.freeze([
  { id: 'codeql', label: 'Analyze (javascript)', kind: 'security' },
  { id: 'guard', label: 'Guard config', kind: 'policy' },
  { id: 'lint', label: 'Lint', kind: 'quality' },
  { id: 'build', label: 'Build', kind: 'quality' },
  { id: 'audit', label: 'npm audit', kind: 'security' },
  { id: 'test', label: 'Test', kind: 'quality' },
  { id: 'osv', label: 'Dependency scan', kind: 'security' },
  { id: 'gitleaks', label: 'Gitleaks', kind: 'security' },
])

/**
 * @param {ReadonlyArray<{ id: string, status: 'pass' | 'fail' | 'pending' }>} results
 * @returns {'ready' | 'blocked' | 'pending'}
 */
export function summarizeMergeReadiness(results) {
  if (!Array.isArray(results) || results.length === 0) {
    return 'pending'
  }

  const byId = new Map(results.map((item) => [item.id, item.status]))
  let hasPending = false

  for (const gate of REQUIRED_GATES) {
    const status = byId.get(gate.id)
    if (status === 'fail') {
      return 'blocked'
    }
    if (status !== 'pass') {
      hasPending = true
    }
  }

  return hasPending ? 'pending' : 'ready'
}

/**
 * @param {'ready' | 'blocked' | 'pending'} readiness
 */
export function readinessLabel(readiness) {
  switch (readiness) {
    case 'ready':
      return 'Ready for merge queue'
    case 'blocked':
      return 'Blocked by failed checks'
    default:
      return 'Waiting on required checks'
  }
}

/**
 * @param {ReadonlyArray<{ id: string, kind: string }>} gates
 * @param {'security' | 'quality' | 'policy'} kind
 */
export function countGatesByKind(gates, kind) {
  return gates.filter((gate) => gate.kind === kind).length
}
