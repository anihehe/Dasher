import { isStale } from '../lib/attention'
import { formatHoursAgo } from '../lib/format'

const PRIORITY_BADGE = {
  P1: 'bg-red-100 text-red-700 dark:bg-red-500/15 dark:text-red-400',
  P2: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400',
  P3: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
}

const STATUS_BADGE = {
  Open: 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400',
  'Waiting on Partner': 'bg-purple-100 text-purple-700 dark:bg-purple-500/15 dark:text-purple-400',
  Closed: 'bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400',
}

export default function CaseTable({ cases }) {
  if (cases.length === 0) {
    return (
      <div className="rounded-lg border border-gray-200 p-6 text-center text-sm text-gray-400 dark:border-gray-700 dark:text-gray-500">
        No cases in this view.
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs uppercase text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-500">
            <th className="px-3 py-2">Case #</th>
            <th className="px-3 py-2">Customer</th>
            <th className="px-3 py-2">Product</th>
            <th className="px-3 py-2">Priority</th>
            <th className="px-3 py-2">Status</th>
            <th className="px-3 py-2">Last update</th>
            <th className="px-3 py-2">Owner</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900">
          {cases.map((c) => (
            <tr
              key={c.ID}
              className={`border-b border-gray-100 last:border-0 dark:border-gray-800 ${
                isStale(c) ? 'border-l-2 border-l-red-500' : ''
              }`}
            >
              <td className="px-3 py-2 text-xs">
                <span className="font-mono text-gray-500 dark:text-gray-400">{c.ID}</span>
                {c.REOPENS > 0 && (
                  <span
                    className="ml-1 rounded-full bg-red-100 px-1.5 py-0.5 text-[10px] font-medium text-red-700 dark:bg-red-500/15 dark:text-red-400"
                    title={`Reopened ${c.REOPENS}x`}
                  >
                    ↻{c.REOPENS}
                  </span>
                )}
              </td>
              <td className="px-3 py-2 font-medium text-gray-900 dark:text-gray-100">{c.PARTNER_NAME}</td>
              <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">{c.PRODUCT}</td>
              <td className="px-3 py-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITY_BADGE[c.PRIORITY]}`}>
                  {c.PRIORITY}
                </span>
              </td>
              <td className="px-3 py-2">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_BADGE[c.STATUS] ?? ''}`}>
                  {c.STATUS}
                </span>
                {c.STATUS !== 'Closed' && c.LAST_RESPONDED_BY === 'partner' && (
                  <span className="ml-1 text-[10px] font-medium text-amber-600 dark:text-amber-400">
                    needs reply
                  </span>
                )}
              </td>
              <td
                className={`px-3 py-2 text-xs ${
                  isStale(c) ? 'font-medium text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {formatHoursAgo(c.LAST_UPDATED_AT)}
              </td>
              <td className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">Me</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
