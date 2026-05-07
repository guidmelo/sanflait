interface FunnelStep {
  name: string;
  count: number;
  pct: number;
  color: string;
}

const STEPS: FunnelStep[] = [
  { name: 'Visitantes', count: 4180, pct: 100, color: 'bg-accent-blue' },
  { name: 'Leads captados', count: 1240, pct: 29.7, color: 'bg-accent-purple' },
  { name: 'Em negociação', count: 520, pct: 12.4, color: 'bg-accent-teal' },
  { name: 'Convertidos', count: 347, pct: 8.3, color: 'bg-accent-green' },
  { name: 'Perdidos', count: 173, pct: 4.1, color: 'bg-accent-red' },
];

export function SalesFunnel() {
  return (
    <div className="space-y-2">
      {STEPS.map((s) => (
        <div key={s.name}>
          <div className="flex justify-between text-[10px] mb-1">
            <span className="text-ink-text-2">{s.name}</span>
            <span className="text-ink-text-1 font-medium">{s.count.toLocaleString('pt-BR')}</span>
          </div>
          <div className="h-5 bg-ink-3 rounded-sm overflow-hidden">
            <div
              className={`h-full ${s.color} flex items-center px-2`}
              style={{ width: `${s.pct}%`, minWidth: '3rem' }}
            >
              <span className="text-[9px] text-white/85 font-medium">
                {s.pct.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
