import { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Eye, AlertTriangle, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { products } from '@/lib/mock';
import { cn, formatBRL } from '@/lib/utils';

type Product = typeof products[0];

export function ProductsPage() {
  const [query, setQuery] = useState('');
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return !q
      ? products
      : products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.collection.toLowerCase().includes(q),
        );
  }, [query]);

  return (
    <>
      <AdminTopBar title="Produtos" subtitle={`${products.length} SKUs no catálogo`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total SKUs', value: products.length.toString(), accent: 'border-accent-blue' },
            { label: 'Em estoque', value: `${products.reduce((s, p) => s + p.variants.reduce((a, v) => a + v.stock, 0), 0)} un.`, accent: 'border-accent-green' },
            { label: 'Ticket médio', value: formatBRL(products.reduce((s, p) => s + p.price, 0) / products.length), accent: 'border-accent-teal' },
            { label: 'Estoque crítico', value: products.filter((p) => p.variants.reduce((s, v) => s + v.stock, 0) < 10).length.toString(), accent: 'border-accent-red' },
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
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar"
                  className="bg-transparent outline-none text-[11px] w-28 text-ink-text-1"
                />
                {query && (
                  <button onClick={() => setQuery('')}>
                    <X size={10} className="text-ink-text-3 hover:text-ink-text-1" />
                  </button>
                )}
              </div>
              <button className="admin-button-primary" onClick={() => alert('Funcionalidade disponível na versão com backend.')}>
                <Plus size={11} /> Novo produto
              </button>
            </>
          }
        >
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-ink-text-3 text-[11px]">Nenhum produto encontrado</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((p, i) => {
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
                        <button
                          className="flex-1 admin-button-ghost justify-center"
                          onClick={() => setViewProduct(p)}
                        >
                          <Eye size={11} /> Ver
                        </button>
                        <button
                          className="flex-1 admin-button-ghost justify-center"
                          onClick={() => setViewProduct(p)}
                        >
                          <Edit2 size={11} /> Editar
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Product detail panel */}
      {viewProduct && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50" onClick={() => setViewProduct(null)}>
          <div className="bg-ink-1 border-l border-line w-full max-w-sm h-full flex flex-col overflow-y-auto admin-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
              <span className="text-[13px] font-semibold text-ink-text-1">Detalhes do produto</span>
              <button onClick={() => setViewProduct(null)} className="text-ink-text-3 hover:text-ink-text-1">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div className="aspect-[4/3] bg-ink-3 rounded" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{viewProduct.collection}</p>
                <p className="text-[16px] font-medium text-ink-text-1 mb-1">{viewProduct.name}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[16px] font-semibold text-accent-teal">{formatBRL(viewProduct.price)}</span>
                  {viewProduct.oldPrice && (
                    <span className="text-[11px] line-through text-ink-text-4">{formatBRL(viewProduct.oldPrice)}</span>
                  )}
                </div>
                <p className="text-[11px] text-ink-text-2 leading-[1.6]">{viewProduct.description}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">Variantes ({viewProduct.variants.length})</p>
                <div className="space-y-1.5">
                  {viewProduct.variants.map((v, i) => (
                    <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded px-2.5 py-2 text-[11px]">
                      <span className="text-ink-text-1">{v.color} · {v.size}</span>
                      <span className={cn('font-medium', v.stock < 5 ? 'text-accent-red' : 'text-ink-text-2')}>
                        {v.stock} un.
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
