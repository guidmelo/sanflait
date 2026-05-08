import { useData } from '@/stores/data';
import { formatBRL } from '@/lib/utils';
import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  CONVERTIDO: 'bg-accent-green-dim text-accent-green',
  EM_NEGOCIACAO: 'bg-accent-amber-dim text-accent-amber',
  PERDIDO: 'bg-accent-red-dim text-accent-red',
};
const STATUS_LABEL = { CONVERTIDO: 'Convertido', EM_NEGOCIACAO: 'Negociando', PERDIDO: 'Perdido' };
const PRICE_COLOR = { CONVERTIDO: 'text-accent-teal', EM_NEGOCIACAO: 'text-accent-amber', PERDIDO: 'text-accent-red' };

export function RecentSales() {
  const { sales } = useData();

  if (sales.length === 0) {
    return (
      <p className="text-[11px] text-ink-text-3 text-center py-6">
        Nenhuma venda registrada ainda.
      </p>
    );
  }

  return (
    <div className="space-y-1.5">
      {sales.slice(0, 5).map((s) => (
        <div key={s.id} className="flex justify-between items-center py-1.5 border-b border-line last:border-b-0 last:pb-0">
          <div className="min-w-0">
            <p className="text-[11px] font-medium text-ink-text-1 truncate">{s.description}</p>
            <p className="text-[10px] text-ink-text-3 truncate">via {s.vendorName}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-3">
            <p className={cn('text-[11px] font-semibold', PRICE_COLOR[s.status])}>{formatBRL(s.amount)}</p>
            <span className={cn('admin-pill mt-1', STATUS_STYLES[s.status])}>{STATUS_LABEL[s.status]}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
