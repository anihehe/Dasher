import { useState } from 'react'
import CaseTable from './CaseTable'

function matchesSearch(c, term) {
  if (!term) return true
  const needle = term.toLowerCase()
  return (
    c.ID.toLowerCase().includes(needle) ||
    c.SUBJECT.toLowerCase().includes(needle) ||
    c.PARTNER_NAME.toLowerCase().includes(needle)
  )
}

export default function CaseListPanel({ title, icon, cases, tabs, searchTerm }) {
  const [activeTab, setActiveTab] = useState(tabs[0].key)

  const tab = tabs.find((t) => t.key === activeTab) ?? tabs[0]
  const visibleCases = cases.filter(tab.filter).filter((c) => matchesSearch(c, searchTerm))

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-gray-100">
          {icon}
          {title}
        </div>
      </div>
      <div className="mb-3 flex flex-wrap gap-1 border-b border-gray-200 dark:border-gray-700">
        {tabs.map((t) => {
          const count = cases.filter(t.filter).length
          const isActive = t.key === activeTab
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`-mb-px border-b-2 px-3 py-1.5 text-xs font-medium ${
                isActive
                  ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {t.label} ({count})
            </button>
          )
        })}
      </div>
      <CaseTable cases={visibleCases} />
    </div>
  )
}
