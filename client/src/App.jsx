import { useEffect, useState } from 'react'
import { useCases } from './hooks/useCases'
import { isStale, rankByAttention } from './lib/attention'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import KpiCards from './components/KpiCards'
import CaseListPanel from './components/CaseListPanel'
import CaseDistribution from './components/CaseDistribution'
import CaseAging from './components/CaseAging'
import RecentActivity from './components/RecentActivity'
import WeeklyTrends from './components/WeeklyTrends'
import PartnerHealth from './components/PartnerHealth'

function useDarkMode() {
  const [dark, setDark] = useState(() => localStorage.getItem('dasher-theme') === 'dark')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('dasher-theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark]
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

function attentionTier(c) {
  if (c.PRIORITY === 'P1' || isStale(c)) return 'critical'
  if (c.PRIORITY === 'P2' || c.REOPENS > 0) return 'attention'
  return 'normal'
}

const MY_CASES_TABS = [
  { key: 'all', label: 'All', filter: () => true },
  { key: 'open', label: 'Open', filter: (c) => c.STATUS === 'Open' },
  { key: 'waiting', label: 'Waiting on Partner', filter: (c) => c.STATUS === 'Waiting on Partner' },
  { key: 'closed', label: 'Closed', filter: (c) => c.STATUS === 'Closed' },
]

const ATTENTION_TABS = [
  { key: 'critical', label: 'Critical', filter: (c) => attentionTier(c) === 'critical' },
  { key: 'attention', label: 'Attention', filter: (c) => attentionTier(c) === 'attention' },
  { key: 'normal', label: 'Normal', filter: (c) => attentionTier(c) === 'normal' },
]

function App() {
  const { data, isLoading, error, refetch, dataUpdatedAt } = useCases()
  const [dark, setDark] = useDarkMode()
  const [searchTerm, setSearchTerm] = useState('')

  if (isLoading) return <p className="p-6 text-sm text-gray-500 dark:text-gray-400">Loading cases…</p>
  if (error) return <p className="p-6 text-sm text-red-600 dark:text-red-400">Error: {error.message}</p>

  const openCases = rankByAttention(data.filter((c) => c.STATUS !== 'Closed'))
  const staleCount = openCases.filter(isStale).length

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar lastUpdated={dataUpdatedAt} onRefresh={refetch} />
      <div className="flex-1">
        <TopBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          notificationCount={staleCount}
          dark={dark}
          onToggleDark={() => setDark(!dark)}
        />

        <div className="p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                {greeting()}, Anirudh!
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Here's what's happening with your support cases today.
              </p>
            </div>
            <div className="text-sm text-gray-400 dark:text-gray-500">
              {new Date().toLocaleDateString(undefined, {
                weekday: 'short',
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}{' '}
              {new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <KpiCards cases={openCases} />

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="flex flex-col gap-4 lg:col-span-2">
              <CaseListPanel title="My Cases" cases={data} tabs={MY_CASES_TABS} searchTerm={searchTerm} />
              <CaseListPanel
                title="Cases Needing Attention"
                cases={openCases}
                tabs={ATTENTION_TABS}
                searchTerm={searchTerm}
              />
            </div>
            <div className="flex flex-col gap-4">
              <CaseDistribution cases={openCases} />
              <CaseAging cases={openCases} />
              <RecentActivity cases={data} />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <WeeklyTrends />
            <PartnerHealth />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
