import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { formatCurrency } from '../../utils/formatters'

export default function MonthlyTrendChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={224}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }}>
        <CartesianGrid stroke="#2A3935" strokeDasharray="3 4" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: '#8FA39B', fontSize: 12, fontFamily: 'Sora' }}
          axisLine={{ stroke: '#2A3935' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: '#8FA39B', fontSize: 11, fontFamily: 'IBM Plex Mono' }}
          axisLine={false}
          tickLine={false}
          width={56}
          tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v)}
        />
        <Tooltip
          formatter={(value) => formatCurrency(value)}
          cursor={{ fill: 'rgba(255,255,255,0.04)' }}
          contentStyle={{
            background: '#1D2C28',
            border: '1px solid #2A3935',
            borderRadius: 10,
            fontSize: 13,
            color: '#ECEFE9',
          }}
        />
        <Bar dataKey="total" fill="#79A88A" radius={[6, 6, 0, 0]} maxBarSize={36} />
      </BarChart>
    </ResponsiveContainer>
  )
}
