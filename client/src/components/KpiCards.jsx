import { daysOpen, isStale } from '../lib/attention'
import { useWeeklyTrends } from '../hooks/useWeeklyTrends'

const CARD_ACCENT = {
  gray: 'text-gray-900 dark:text-gray-100',
  red: 'text-red-600 dark:text-red-400',
  amber: 'text-amber-600 dark:text-amber-400',
  purple: 'text-purple-600 dark:text-purple-400',
  blue: 'text-blue-600 dark:text-blue-400',
  green: 'text-green-600 dark:text-green-400',
}

function Kpi({ label, value, accent = 'gray' }) {
  return (
    <div className="rounded-lg bg-white p-3 shadow-sm dark:bg-gray-800">
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      <div className={`text-xl font-semibold ${CARD_ACCENT[accent]}`}>{value}</div>
    </div>
  )
}

export default function KpiCards({ cases }) {
  const { data: weeklyTrends } = useWeeklyTrends()

  const byPriority = { P1: 0, P2: 0, P3: 0 }
  let staleCount = 0
  let newCount = 0
  let awaitingCustomer = 0
  let reopenedCount = 0
  for (const c of cases) {
    byPriority[c.PRIORITY] = (byPriority[c.PRIORITY] ?? 0) + 1
    if (isStale(c)) staleCount += 1
    if (daysOpen(c) < 1) newCount += 1
    if (c.LAST_RESPONDED_BY === 'you') awaitingCustomer += 1
    if (c.REOPENS > 0) reopenedCount += 1
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
      <Kpi label="My Open Cases" value={cases.length} />
      <Kpi label="New (24h)" value={newCount} accent="blue" />
      <Kpi label="Stale (48h+)" value={staleCount} accent="red" />
      <Kpi label="P1 / Critical" value={byPriority.P1} accent="purple" />
      <Kpi label="Awaiting Customer" value={awaitingCustomer} accent="amber" />
      <Kpi label="Reopened" value={reopenedCount} accent="red" />
      <Kpi label="Resolved This Week" value={weeklyTrends?.CLOSED_THIS_WEEK ?? '—'} accent="green" />
    </div>
  )
}
