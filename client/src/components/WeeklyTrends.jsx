import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { useWeeklyTrends } from '../hooks/useWeeklyTrends'

const AXIS_COLOR = '#9ca3af' // gray-400 — readable on both light and dark backgrounds

export default function WeeklyTrends() {
  const { data, isLoading, error } = useWeeklyTrends()

  if (isLoading) return null
  if (error) return <p className="text-xs text-red-600 dark:text-red-400">Error: {error.message}</p>

  const openedDelta = data.OPENED_THIS_WEEK - data.OPENED_LAST_WEEK

  return (
    <div>
      <div className="mb-2 text-xs font-medium text-gray-700 dark:text-gray-300">Weekly trends</div>
      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">Opened</div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{data.OPENED_THIS_WEEK}</div>
          <div className={`text-xs ${openedDelta > 0 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
            {openedDelta >= 0 ? '+' : ''}
            {openedDelta} vs last week
          </div>
        </div>
        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">Closed</div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{data.CLOSED_THIS_WEEK}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">this week</div>
        </div>
        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">Avg resolution time</div>
          <div className="text-base font-semibold text-gray-900 dark:text-gray-100">{data.AVG_RESOLUTION_DAYS}d</div>
        </div>
        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400">SLA breach rate</div>
          <div className="text-base font-semibold text-red-600 dark:text-red-400">
            {Math.round(data.SLA_BREACH_RATE * 100)}%
          </div>
        </div>
      </div>
      <div className="mt-2 h-40 rounded-md bg-white p-2 shadow-sm dark:bg-gray-800">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data.WEEKLY_SERIES} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={AXIS_COLOR} opacity={0.2} vertical={false} />
            <XAxis dataKey="WEEK" tick={{ fill: AXIS_COLOR, fontSize: 10 }} axisLine={{ stroke: AXIS_COLOR }} tickLine={false} />
            <YAxis tick={{ fill: AXIS_COLOR, fontSize: 10 }} axisLine={false} tickLine={false} width={24} />
            <Tooltip contentStyle={{ fontSize: 12 }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar dataKey="OPENED" fill="#3b82f6" radius={2} />
            <Bar dataKey="CLOSED" fill="#22c55e" radius={2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
