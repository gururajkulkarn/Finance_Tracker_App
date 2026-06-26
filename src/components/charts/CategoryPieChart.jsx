import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export default function CategoryPieChart({ data }) {
  if (data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-sm text-ledger-faint">
        No spending yet this month
      </div>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={224}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={58}
          outerRadius={86}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          contentStyle={{
            background: '#1D2C28',
            border: '1px solid #2A3935',
            borderRadius: 10,
            fontSize: 13,
            color: '#ECEFE9',
          }}
          itemStyle={{ color: '#ECEFE9' }}
        />
      </PieChart>
    </ResponsiveContainer>
  )
}
