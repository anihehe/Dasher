import { usePartnerHealth } from '../hooks/usePartnerHealth'

export default function PartnerHealth() {
  const { data, isLoading, error } = usePartnerHealth()

  if (isLoading) return null
  if (error) return <p className="text-xs text-red-600 dark:text-red-400">Error: {error.message}</p>

  const partners = [...data].sort((a, b) => b.OPEN_CASES - a.OPEN_CASES)

  return (
    <div>
      <div className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">
        Partner health <span className="text-gray-400 dark:text-gray-500">by open case volume</span>
      </div>
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
        <div className="grid grid-cols-4 gap-2 bg-gray-50 px-3 py-1.5 text-xs uppercase text-gray-400 dark:bg-gray-800 dark:text-gray-500">
          <div>Partner</div>
          <div className="text-right">Open</div>
          <div className="text-right">Avg resolution</div>
          <div className="text-right">Repeat rate</div>
        </div>
        {partners.map((p) => (
          <div
            key={p.PARTNER_NAME}
            className="grid grid-cols-4 gap-2 border-t border-gray-100 px-3 py-1.5 text-xs dark:border-gray-700"
          >
            <div className="font-medium text-gray-900 dark:text-gray-100">{p.PARTNER_NAME}</div>
            <div
              className={`text-right ${
                p.OPEN_CASES > 2 ? 'font-medium text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {p.OPEN_CASES}
            </div>
            <div className="text-right text-gray-700 dark:text-gray-300">{p.AVG_RESOLUTION_DAYS}d</div>
            <div
              className={`text-right ${
                p.REPEAT_RATE > 0.3 ? 'font-medium text-red-600 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              {Math.round(p.REPEAT_RATE * 100)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
