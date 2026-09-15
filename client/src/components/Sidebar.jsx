const NAV_ITEMS = ['Home', 'My Cases', 'All Cases', 'Settings']

export default function Sidebar({ lastUpdated, onRefresh }) {
  return (
    <div className="flex h-full w-44 shrink-0 flex-col justify-between border-r border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-1">
        {NAV_ITEMS.map((item, i) => (
          <div
            key={item}
            className={`rounded-md px-3 py-2 text-sm ${
              i === 0
                ? 'bg-blue-50 font-medium text-blue-700 dark:bg-blue-500/15 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 pt-3 text-xs text-gray-400 dark:border-gray-700 dark:text-gray-500">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-green-500" /> Environment: PROD
        </div>
        <div className="flex items-center justify-between">
          <span>Updated {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : '—'}</span>
          <button onClick={onRefresh} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" title="Refresh">
            ⟳
          </button>
        </div>
      </div>
    </div>
  )
}
