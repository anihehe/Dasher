import { formatHoursAgo } from '../lib/format'

function describe(c) {
  if (c.STATUS === 'Closed') return { text: 'Case resolved', dot: 'bg-green-500' }
  if (c.REOPENS > 0) return { text: 'Case reopened', dot: 'bg-amber-500' }
  if (c.LAST_RESPONDED_BY === 'partner') return { text: 'Customer replied', dot: 'bg-blue-500' }
  return { text: 'You responded', dot: 'bg-gray-400' }
}

export default function RecentActivity({ cases }) {
  const recent = [...cases]
    .sort((a, b) => new Date(b.LAST_UPDATED_AT) - new Date(a.LAST_UPDATED_AT))
    .slice(0, 5)

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Recent Activity</div>
      <div className="flex flex-col gap-2.5">
        {recent.map((c) => {
          const { text, dot } = describe(c)
          return (
            <div key={c.ID} className="flex items-start gap-2 text-xs">
              <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${dot}`} />
              <div className="flex-1 text-gray-700 dark:text-gray-300">
                <span className="font-medium text-gray-900 dark:text-gray-100">{c.ID}</span> — {text}
              </div>
              <div className="shrink-0 text-gray-400 dark:text-gray-500">{formatHoursAgo(c.LAST_UPDATED_AT)}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
