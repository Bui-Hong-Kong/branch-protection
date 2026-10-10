import {
  REQUIRED_GATES,
  countGatesByKind,
  readinessLabel,
  summarizeMergeReadiness,
} from '../lib/protectionStatus'

/**
 * Demo panel for the branch-protection lab (dev-1 change).
 * Uses demo "all pass" results so UI + tests stay deterministic.
 */
function ProtectionPanel() {
  const demoResults = REQUIRED_GATES.map((gate) => ({
    id: gate.id,
    status: 'pass',
  }))
  const readiness = summarizeMergeReadiness(demoResults)
  const securityCount = countGatesByKind(REQUIRED_GATES, 'security')
  const qualityCount = countGatesByKind(REQUIRED_GATES, 'quality')

  return (
    <section id="protection-panel" aria-labelledby="protection-heading">
      <h2 id="protection-heading">Branch protection gates</h2>
      <p className="protection-summary">
        {readinessLabel(readiness)} · {securityCount} security · {qualityCount}{' '}
        quality checks
      </p>
      <ul className="protection-list">
        {REQUIRED_GATES.map((gate) => (
          <li key={gate.id} data-kind={gate.kind}>
            <span className="gate-label">{gate.label}</span>
            <span className="gate-status" data-status="pass">
              pass
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ProtectionPanel
