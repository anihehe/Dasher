const PRIORITY_SCORE = { P1: 300, P2: 200, P3: 100 }

export function hoursSince(dateStr) {
  return (Date.now() - new Date(dateStr).getTime()) / (1000 * 60 * 60)
}

export function isStale(caseItem) {
  return hoursSince(caseItem.LAST_UPDATED_AT) > 48
}

export function daysOpen(caseItem) {
  return hoursSince(caseItem.CREATED_AT) / 24
}

export function attentionScore(caseItem) {
  const priorityScore = PRIORITY_SCORE[caseItem.PRIORITY] ?? 0
  const stalenessScore = Math.min(hoursSince(caseItem.LAST_UPDATED_AT), 200)
  return priorityScore + stalenessScore
}

export function rankByAttention(cases) {
  return [...cases].sort((a, b) => attentionScore(b) - attentionScore(a))
}
