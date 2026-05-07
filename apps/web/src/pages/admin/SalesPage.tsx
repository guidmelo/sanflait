import { Plus, Search, FileDown } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { sales } from '@/lib/mock';
import { formatBRL, relativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  CONVERTIDO: 'bg-accent-green-dim text-accent-green',
  EM_NEGOCIACAO: 'bg-accent-amber-dim text-accent-amber',
  PERDIDO: 'bg-accent-red-dim text-accent-red',
};
const STATUS_LABEL = {
  CONVERTIDO: 'Convertido',
  EM_NEGOCIACAO: 'Negociando',
  PERDIDO: 'Perdido',
};

export function SalesPage() {
  return (
    <>
      <AdminTopBar title="Vendas" subtitle={`${sales.length} registros`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        {/* KPIs minimal */}
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total registrado', value: 'R$ 84,2K', accent: 'border-accent-teal' },
            { label: 'Convertidas', value: '218', accent: 'border-accent-green' },
            { label: 'Em negociação', value: '54', accent: 'border-accent-amber' },
            { label: 'Perdidas', value: '37', accent: 'border-accent-red' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">
                {k.label}
              </p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Todas as vendas"
          subtitle="Filtre por vendedor, status ou período"
          action={
            <>
              <div className="flex items-center gap-1.5 bg-ink-3 border border-line rounded px-2 py-1">
                <Search size={11} className="text-ink-text-3" />
                <input placeholder="Buscar" className="bg-transparent outline-none text-[11px] w-28" />
              </div>
              <button className="admin-button-ghost"><FileDown size={11} /> Excel</button>
              <button className="admin-button-primary"><Plus size={11} /> Nova venda</button>
            </>
          }
        >
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-wider text-ink-text-3 border-b border-line">
                  <th className="text-left py-2 px-4">Cliente</th>
                  <th className="text-left py-2">Produto</th>
                  <th className="text-left py-2">Vendedor</th>
                  <th className="text-left py-2">Canal</th>
                  <th className="text-right py-2">Valor</th>
                  <th className="text-center py-2">Status</th>
                  <th className="text-right py-2 px-4">Data</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((s) => (
                  <tr
                    key={s.id}
                    className="border-b border-line/50 hover:bg-ink-3 transition-colors"
                  >
                    <td className="py-2.5 px-4 text-ink-text-1 font-medium">{s.customerName}</td>
                    <td className="py-2.5 text-ink-text-2">{s.description}</td>
                    <td className="py-2.5 text-ink-text-2">{s.vendorName}</td>
                    <td className="py-2.5 text-ink-text-3">{s.channel}</td>
                    <td className="py-2.5 text-right text-ink-text-1 font-medium">
                      {formatBRL(s.amount)}
                    </td>
                    <td className="py-2.5 text-center">
                      <span className={cn('admin-pill', STATUS_STYLES[s.status])}>
                        {STATUS_LABEL[s.status]}
                      </span>
                    </td>
                    <td className="py-2.5 text-right text-ink-text-3 px-4">
                      {relativeTime(s.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
