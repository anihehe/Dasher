import { hoursSince } from './attention'

export function formatHoursAgo(dateStr) {
  const hours = hoursSince(dateStr)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${Math.round(hours)}h ago`
  return `${Math.round(hours / 24)}d ago`
}
