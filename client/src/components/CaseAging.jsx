import { daysOpen } from '../lib/attention'

const BUCKETS = [
  { label: '0 – 1 day', test: (d) => d <= 1 },
  { label: '1 – 3 days', test: (d) => d > 1 && d <= 3 },
  { label: '3 – 7 days', test: (d) => d > 3 && d <= 7 },
  { label: '7 – 14 days', test: (d) => d > 7 && d <= 14 },
  { label: '14+ days', test: (d) => d > 14 },
]

export default function CaseAging({ cases }) {
  const ages = cases.map(daysOpen)
  const counts = BUCKETS.map((b) => ages.filter(b.test).length)
  const max = Math.max(...counts, 1)

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-3 text-sm font-semibold text-gray-900 dark:text-gray-100">Case Aging</div>
      <div className="flex flex-col gap-2">
        {BUCKETS.map((b, i) => (
          <div key={b.label} className="flex items-center gap-2 text-xs">
            <div className="w-20 shrink-0 text-gray-500 dark:text-gray-400">{b.label}</div>
            <div className="h-2 flex-1 rounded-full bg-gray-100 dark:bg-gray-700">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{ width: `${(counts[i] / max) * 100}%` }}
              />
            </div>
            <div className="w-4 text-right text-gray-700 dark:text-gray-300">{counts[i]}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
