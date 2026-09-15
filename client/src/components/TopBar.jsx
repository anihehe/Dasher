export default function TopBar({ searchTerm, onSearchChange, notificationCount, dark, onToggleDark }) {
  return (
    <div className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3 dark:border-gray-700 dark:bg-gray-800">
      <div className="text-base font-semibold text-gray-900 dark:text-gray-100">
        Das<span className="text-blue-600 dark:text-blue-400">her</span>
      </div>
      <div className="text-xs text-gray-400 dark:text-gray-500">Support Engineer Dashboard</div>

      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search cases (ID, customer, keyword...)"
        className="mx-auto w-full max-w-md rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-blue-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200"
      />

      <button
        onClick={onToggleDark}
        className="rounded-md border border-gray-200 px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        {dark ? 'Light mode' : 'Dark mode'}
      </button>

      <div className="relative text-gray-500 dark:text-gray-400" title={`${notificationCount} stale cases`}>
        🔔
        {notificationCount > 0 && (
          <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
            {notificationCount}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-medium text-white">
          AG
        </div>
        <div className="hidden text-xs sm:block">
          <div className="font-medium text-gray-900 dark:text-gray-100">Anirudh G.</div>
          <div className="text-gray-400 dark:text-gray-500">Support Engineer</div>
        </div>
      </div>
    </div>
  )
}
