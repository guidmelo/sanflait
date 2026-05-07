import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { dailyTraffic } from '@/lib/mock';

export function TrafficChart() {
  return (
    <div className="h-44">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={dailyTraffic} margin={{ top: 8, right: 6, left: -12, bottom: 0 }}>
          <defs>
            <linearGradient id="visGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#14B8A6" stopOpacity={0.5} />
              <stop offset="100%" stopColor="#14B8A6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#222226" strokeDasharray="2 4" vertical={false} />
          <XAxis
            dataKey="day"
            tick={{ fill: '#6B6B78', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: '#6B6B78', fontSize: 9 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: '#1C1C1F',
              border: '0.5px solid #3A3A42',
              borderRadius: 4,
              fontSize: 11,
              color: '#F2F2F5',
            }}
          />
          <Area
            type="monotone"
            dataKey="visitors"
            stroke="#3B82F6"
            strokeWidth={1.5}
            fill="url(#visGrad)"
            name="Visitantes"
          />
          <Area
            type="monotone"
            dataKey="conversions"
            stroke="#14B8A6"
            strokeWidth={1.5}
            fill="url(#convGrad)"
            name="Conversões"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
