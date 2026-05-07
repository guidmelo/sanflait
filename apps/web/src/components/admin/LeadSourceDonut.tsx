import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { leadSources } from '@/lib/mock';

export function LeadSourceDonut() {
  const total = leadSources.reduce((s, x) => s + x.value, 0);
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-28 h-28">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leadSources}
              dataKey="value"
              innerRadius={36}
              outerRadius={56}
              paddingAngle={2}
              stroke="none"
            >
              {leadSources.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[15px] font-semibold text-ink-text-1">{total}%</p>
          <p className="text-[9px] text-ink-text-3">leads</p>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-x-4 gap-y-1.5">
        {leadSources.map((s) => (
          <div key={s.name} className="flex items-center justify-between text-[10px]">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-ink-text-2 truncate">{s.name}</span>
            </div>
            <span className="text-ink-text-1 font-medium">{s.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
