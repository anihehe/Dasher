import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts'

const COLORS = { P1: '#ef4444', P2: '#f59e0b', P3: '#9ca3af' }

export default function CaseDistribution({ cases }) {
  const byPriority = { P1: 0, P2: 0, P3: 0 }
  for (const c of cases) byPriority[c.PRIORITY] = (byPriority[c.PRIORITY] ?? 0) + 1
  const total = cases.length
  const data = ['P1', 'P2', 'P3'].map((p) => ({ name: p, value: byPriority[p] }))

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-800">
      <div className="mb-2 text-sm font-semibold text-gray-900 dark:text-gray-100">Case Distribution</div>
      <div className="flex items-center gap-4">
        <div className="relative h-32 w-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius="65%" outerRadius="100%" paddingAngle={2} stroke="none">
                {data.map((d) => (
                  <Cell key={d.name} fill={COLORS[d.name]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{total}</div>
            <div className="text-[10px] text-gray-400 dark:text-gray-500">Total</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5 text-xs">
          {data.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[d.name] }} />
              {d.name} — {d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
