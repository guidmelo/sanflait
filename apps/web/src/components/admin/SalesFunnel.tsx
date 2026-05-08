import { useData } from '@/stores/data';

export function SalesFunnel() {
  const { customers, sales } = useData();
  const total = customers.length;
  const negotiating = customers.filter((c) => c.status === 'EM_NEGOCIACAO').length;
  const converted = customers.filter((c) => c.status === 'CONVERTIDO').length;
  const lost = customers.filter((c) => c.status === 'PERDIDO').length;
  const totalSales = sales.length;

  const pct = (n: number) => (total > 0 ? (n / total) * 100 : 0);

  if (total === 0 && totalSales === 0) {
    return (
      <p className="text-[11px] text-ink-text-3 text-center py-6">
        Nenhum dado no funil ainda.
      </p>
    );
  }

  const STEPS = [
    { name: 'Leads captados', count: total, pct: 100, color: 'bg-accent-blue' },
    { name: 'Em negociação', count: negotiating, pct: pct(negotiating), color: 'bg-accent-teal' },
    { name: 'Convertidos', count: converted, pct: pct(converted), color: 'bg-accent-green' },
    { name: 'Vendas realizadas', count: totalSales, pct: total > 0 ? (totalSales / total) * 100 : 0, color: 'bg-accent-purple' },
    { name: 'Perdidos', count: lost, pct: pct(lost), color: 'bg-accent-red' },
  ];

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
              style={{ width: `${Math.max(s.pct, s.count > 0 ? 8 : 0)}%` }}
            >
              <span className="text-[9px] text-white/85 font-medium">{s.pct.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
