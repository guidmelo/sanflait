import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { monthlyRevenue } from '@/lib/mock';

export function RevenueChart() {
  const max = Math.max(...monthlyRevenue.map((d) => d.value));
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyRevenue} margin={{ top: 12, right: 0, left: -10, bottom: 0 }}>
          <XAxis
            dataKey="month"
            tick={{ fill: '#A8A8B3', fontSize: 10 }}
            axisLine={{ stroke: '#2E2E34' }}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6B6B78', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
          />
          <Tooltip
            cursor={{ fill: '#242428' }}
            contentStyle={{
              background: '#1C1C1F',
              border: '0.5px solid #3A3A42',
              borderRadius: 4,
              fontSize: 11,
              color: '#F2F2F5',
            }}
            formatter={(value: number) => [`R$ ${(value / 1000).toFixed(1)}K`, 'Receita']}
          />
          <Bar dataKey="value" radius={[3, 3, 0, 0]}>
            {monthlyRevenue.map((d, i) => (
              <Cell
                key={i}
                fill="#3B82F6"
                fillOpacity={0.4 + (d.value / max) * 0.6}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
