import { Plus, Search, Edit2, Eye, AlertTriangle } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { products } from '@/lib/mock';
import { cn, formatBRL } from '@/lib/utils';

export function ProductsPage() {
  return (
    <>
      <AdminTopBar title="Produtos" subtitle={`${products.length} SKUs no catálogo`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total SKUs', value: products.length.toString(), accent: 'border-accent-blue' },
            { label: 'Em estoque', value: '1.248 un.', accent: 'border-accent-green' },
            { label: 'Ticket médio', value: 'R$ 524', accent: 'border-accent-teal' },
            { label: 'Estoque crítico', value: '3', accent: 'border-accent-red' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Catálogo de produtos"
          subtitle="Gerencie SKUs, variantes e preços"
          action={
            <>
              <div className="flex items-center gap-1.5 bg-ink-3 border border-line rounded px-2 py-1">
                <Search size={11} className="text-ink-text-3" />
                <input placeholder="Buscar" className="bg-transparent outline-none text-[11px] w-28" />
              </div>
              <button className="admin-button-primary"><Plus size={11} /> Novo produto</button>
            </>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {products.map((p, i) => {
              const stock = p.variants.reduce((s, v) => s + v.stock, 0);
              const lowStock = stock < 10;
              return (
                <div key={p.id} className="bg-ink-2 border border-line rounded overflow-hidden hover:border-line-strong transition-colors">
                  <div className="aspect-[4/3] bg-ink-3 relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: ['radial-gradient(circle at 50% 30%, #2C2C31, #161618)', 'radial-gradient(circle at 30% 60%, #34343A, #0E0E10)', 'radial-gradient(circle at 70% 40%, #242428, #0E0E10)'][i % 3],
                      }}
                    />
                    {p.badge && (
                      <span className="absolute top-2 left-2 admin-pill bg-accent-purple text-white">
                        {p.badge}
                      </span>
                    )}
                    {lowStock && (
                      <span className="absolute top-2 right-2 admin-pill bg-accent-red text-white flex items-center gap-1">
                        <AlertTriangle size={9} /> Estoque baixo
                      </span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{p.collection}</p>
                    <p className="text-[13px] font-medium text-ink-text-1 mb-1.5">{p.name}</p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-[14px] font-semibold text-accent-teal">{formatBRL(p.price)}</span>
                      {p.oldPrice && (
                        <span className="text-[10px] line-through text-ink-text-4">{formatBRL(p.oldPrice)}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-ink-text-3 mb-3">
                      <span>{p.variants.length} variantes</span>
                      <span className={lowStock ? 'text-accent-red' : 'text-ink-text-2'}>{stock} un.</span>
                    </div>
                    <div className="flex gap-1.5">
                      <button className="flex-1 admin-button-ghost justify-center"><Eye size={11} /> Ver</button>
                      <button className="flex-1 admin-button-ghost justify-center"><Edit2 size={11} /> Editar</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </>
  );
}
