import { useState, useMemo } from 'react';
import { AlertTriangle, Search, FileDown, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { products, stores } from '@/lib/mock';
import { cn } from '@/lib/utils';

export function InventoryPage() {
  const [query, setQuery] = useState('');

  const allRows = useMemo(() =>
    products.flatMap((p) =>
      p.variants.map((v) => ({
        product: p.name,
        collection: p.collection,
        color: v.color,
        size: v.size,
        stocks: stores.map((s, i) => ({
          store: s.name,
          qty: Math.max(0, v.stock - i * 2 + ((v.stock * i) % 4)),
        })),
      })),
    ),
    [],
  );

  const rows = useMemo(() => {
    const q = query.toLowerCase();
    return !q
      ? allRows
      : allRows.filter(
          (r) =>
            r.product.toLowerCase().includes(q) ||
            r.color.toLowerCase().includes(q) ||
            r.size.toLowerCase().includes(q),
        );
  }, [allRows, query]);

  const handleExport = () => {
    const header = ['Produto', 'Coleção', 'Cor', 'Tam.', ...stores.map((s) => s.name), 'Total'].join(';');
    const csvRows = allRows.map((r) => {
      const total = r.stocks.reduce((s, x) => s + x.qty, 0);
      return [r.product, r.collection, r.color, r.size, ...r.stocks.map((s) => s.qty), total].join(';');
    });
    const blob = new Blob([[header, ...csvRows].join('\n')], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'estoque.csv';
    a.click();
  };

  return (
    <>
      <AdminTopBar title="Estoque" subtitle="Multi-loja · variantes" showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total em estoque', value: `${allRows.reduce((s, r) => s + r.stocks.reduce((a, x) => a + x.qty, 0), 0)} un.`, accent: 'border-accent-blue' },
            { label: 'Variantes ativas', value: allRows.length.toString(), accent: 'border-accent-purple' },
            { label: 'Estoque baixo', value: allRows.filter((r) => r.stocks.reduce((s, x) => s + x.qty, 0) < 8 && r.stocks.reduce((s, x) => s + x.qty, 0) > 0).length.toString(), accent: 'border-accent-amber' },
            { label: 'Esgotados', value: allRows.filter((r) => r.stocks.reduce((s, x) => s + x.qty, 0) === 0).length.toString(), accent: 'border-accent-red' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Inventário por loja"
          subtitle="Quantidade disponível por SKU em cada unidade"
          action={
            <>
              <div className="flex items-center gap-1.5 bg-ink-3 border border-line rounded px-2 py-1">
                <Search size={11} className="text-ink-text-3" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar SKU"
                  className="bg-transparent outline-none text-[11px] w-32 text-ink-text-1"
                />
                {query && (
                  <button onClick={() => setQuery('')}>
                    <X size={10} className="text-ink-text-3 hover:text-ink-text-1" />
                  </button>
                )}
              </div>
              <button className="admin-button-ghost" onClick={handleExport}>
                <FileDown size={11} /> Excel
              </button>
            </>
          }
        >
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-wider text-ink-text-3 border-b border-line">
                  <th className="text-left py-2 px-4">Produto</th>
                  <th className="text-left py-2">Cor</th>
                  <th className="text-left py-2">Tam.</th>
                  {stores.map((s) => (
                    <th key={s.id} className="text-center py-2">{s.name}</th>
                  ))}
                  <th className="text-center py-2 px-4">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 ? (
                  <tr><td colSpan={4 + stores.length} className="py-8 text-center text-ink-text-3">Nenhum SKU encontrado</td></tr>
                ) : rows.map((r, i) => {
                  const total = r.stocks.reduce((s, x) => s + x.qty, 0);
                  return (
                    <tr key={i} className="border-b border-line/50 hover:bg-ink-3 transition-colors">
                      <td className="py-2.5 px-4 text-ink-text-1 font-medium">
                        <div>{r.product}</div>
                        <div className="text-[9px] text-ink-text-3">{r.collection}</div>
                      </td>
                      <td className="py-2.5 text-ink-text-2">{r.color}</td>
                      <td className="py-2.5 text-ink-text-2">{r.size}</td>
                      {r.stocks.map((s, j) => (
                        <td key={j} className="py-2.5 text-center">
                          <span className={cn(
                            'inline-flex items-center justify-center min-w-[32px] py-0.5 rounded text-[11px] font-medium',
                            s.qty === 0 && 'text-accent-red',
                            s.qty > 0 && s.qty < 5 && 'text-accent-amber',
                            s.qty >= 5 && 'text-ink-text-1',
                          )}>
                            {s.qty === 0 ? '—' : s.qty}
                          </span>
                        </td>
                      ))}
                      <td className="py-2.5 px-4 text-center">
                        <span className={cn(
                          'admin-pill',
                          total === 0 && 'bg-accent-red-dim text-accent-red',
                          total > 0 && total < 8 && 'bg-accent-amber-dim text-accent-amber',
                          total >= 8 && 'bg-accent-green-dim text-accent-green',
                        )}>
                          {total === 0 && <AlertTriangle size={9} />}
                          {total} un.
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </>
  );
}
