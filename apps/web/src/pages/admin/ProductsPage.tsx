import { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Eye, AlertTriangle, X, Check } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { useData } from '@/stores/data';
import { type Product } from '@/lib/mock';
import { cn, formatBRL } from '@/lib/utils';

type EditForm = {
  name: string; collection: string; category: string;
  price: string; oldPrice: string; badge: string; description: string;
};

const EMPTY_FORM: EditForm = {
  name: '', collection: '', category: '', price: '', oldPrice: '', badge: '', description: '',
};

const COLLECTIONS = ['Primavera 2026', 'Inverno 2026', 'Essenciais', 'Novidades'];
const CATEGORIES = ['Vestidos', 'Camisas', 'Blazers', 'Calças', 'Blusas', 'Casacos', 'Acessórios'];

export function ProductsPage() {
  const { products, updateProduct, addProduct } = useData();
  const [query, setQuery] = useState('');
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState<EditForm>(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return !q ? products : products.filter((p) => p.name.toLowerCase().includes(q) || p.collection.toLowerCase().includes(q));
  }, [query, products]);

  const openEdit = (p: Product) => {
    setForm({
      name: p.name, collection: p.collection, category: p.category,
      price: p.price.toString(), oldPrice: p.oldPrice?.toString() ?? '',
      badge: p.badge ?? '', description: p.description,
    });
    setEditProduct(p);
    setViewProduct(null);
  };

  const openNew = () => {
    setForm(EMPTY_FORM);
    setShowNew(true);
    setEditProduct(null);
    setViewProduct(null);
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const updates: Partial<Product> = {
      name: form.name,
      collection: form.collection,
      category: form.category,
      price: parseFloat(form.price) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : undefined,
      badge: form.badge || undefined,
      description: form.description,
    };
    if (editProduct) {
      updateProduct(editProduct.id, updates);
    } else {
      const slug = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
      addProduct({
        id: `p${Date.now()}`,
        slug,
        images: [],
        variants: [],
        ...updates,
        name: form.name,
        collection: form.collection || 'Novidades',
        category: form.category || 'Outros',
        price: parseFloat(form.price) || 0,
        description: form.description,
      } as Product);
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); setEditProduct(null); setShowNew(false); setForm(EMPTY_FORM); }, 700);
  };

  const handleExport = () => {
    const rows = products.map((p) => `${p.name};${p.collection};${p.category};${p.price}`).join('\n');
    const blob = new Blob([`Nome;Coleção;Categoria;Preço\n${rows}`], { type: 'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'produtos.csv'; a.click();
  };

  const isEditOpen = !!editProduct || showNew;

  return (
    <>
      <AdminTopBar title="Produtos" subtitle={`${products.length} SKUs no catálogo`} showLive={false} onExport={handleExport} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total SKUs', value: products.length.toString(), accent: 'border-accent-blue' },
            { label: 'Em estoque', value: `${products.reduce((s, p) => s + p.variants.reduce((a, v) => a + v.stock, 0), 0)} un.`, accent: 'border-accent-green' },
            { label: 'Ticket médio', value: products.length > 0 ? formatBRL(products.reduce((s, p) => s + p.price, 0) / products.length) : 'R$ 0,00', accent: 'border-accent-teal' },
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
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar" className="bg-transparent outline-none text-[11px] w-28 text-ink-text-1" />
                {query && <button onClick={() => setQuery('')}><X size={10} className="text-ink-text-3 hover:text-ink-text-1" /></button>}
              </div>
              <button className="admin-button-primary" onClick={openNew}><Plus size={11} /> Novo produto</button>
            </>
          }
        >
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-ink-text-3 text-[11px]">Nenhum produto encontrado</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((p, i) => {
                const stock = p.variants.reduce((s, v) => s + v.stock, 0);
                const lowStock = p.variants.length > 0 && stock < 10;
                return (
                  <div key={p.id} className="bg-ink-2 border border-line rounded overflow-hidden hover:border-line-strong transition-colors">
                    <div className="aspect-[4/3] bg-ink-3 relative overflow-hidden">
                      <div className="absolute inset-0" style={{ background: ['radial-gradient(circle at 50% 30%, #2C2C31, #161618)', 'radial-gradient(circle at 30% 60%, #34343A, #0E0E10)', 'radial-gradient(circle at 70% 40%, #242428, #0E0E10)'][i % 3] }} />
                      {p.badge && <span className="absolute top-2 left-2 admin-pill bg-accent-purple text-white">{p.badge}</span>}
                      {lowStock && <span className="absolute top-2 right-2 admin-pill bg-accent-red text-white flex items-center gap-1"><AlertTriangle size={9} /> Baixo</span>}
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{p.collection}</p>
                      <p className="text-[13px] font-medium text-ink-text-1 mb-1.5">{p.name}</p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[14px] font-semibold text-accent-teal">{formatBRL(p.price)}</span>
                        {p.oldPrice && <span className="text-[10px] line-through text-ink-text-4">{formatBRL(p.oldPrice)}</span>}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-ink-text-3 mb-3">
                        <span>{p.variants.length} variantes</span>
                        <span className={lowStock ? 'text-accent-red' : 'text-ink-text-2'}>{p.variants.length > 0 ? `${stock} un.` : '—'}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="flex-1 admin-button-ghost justify-center" onClick={() => { setViewProduct(p); setEditProduct(null); setShowNew(false); }}>
                          <Eye size={11} /> Ver
                        </button>
                        <button className="flex-1 admin-button-ghost justify-center" onClick={() => openEdit(p)}>
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

      {/* Edit / New product panel */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50" onClick={() => { setEditProduct(null); setShowNew(false); }}>
          <div className="bg-ink-1 border-l border-line w-full max-w-sm h-full flex flex-col overflow-y-auto admin-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
              <span className="text-[13px] font-semibold text-ink-text-1">{editProduct ? 'Editar Produto' : 'Novo Produto'}</span>
              <button onClick={() => { setEditProduct(null); setShowNew(false); }} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="p-4 space-y-3 flex-1">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Nome *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome do produto" className="admin-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Coleção</label>
                  <select value={form.collection} onChange={(e) => setForm({ ...form, collection: e.target.value })} className="admin-input w-full">
                    <option value="">Selecionar</option>
                    {COLLECTIONS.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Categoria</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="admin-input w-full">
                    <option value="">Selecionar</option>
                    {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Preço (R$) *</label>
                  <input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="0,00" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Preço antigo (R$)</label>
                  <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} placeholder="0,00" className="admin-input w-full" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Badge (ex: -20%, Novo)</label>
                <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Novo" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição do produto..." rows={3} className="admin-input w-full resize-none" />
              </div>
              {editProduct && editProduct.variants.length > 0 && (
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-2">Variantes ({editProduct.variants.length})</p>
                  <div className="space-y-1.5">
                    {editProduct.variants.map((v, i) => (
                      <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded px-2.5 py-2 text-[11px]">
                        <span className="text-ink-text-1">{v.color} · {v.size}</span>
                        <span className={cn('font-medium', v.stock < 5 ? 'text-accent-red' : 'text-ink-text-2')}>{v.stock} un.</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-line flex gap-2 flex-shrink-0">
              <button onClick={() => { setEditProduct(null); setShowNew(false); }} className="admin-button-ghost flex-1">Cancelar</button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.price}
                className={cn('admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed transition-all', saved && 'bg-accent-green')}
              >
                {saved ? <><Check size={11} /> Salvo</> : 'Salvar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View panel */}
      {viewProduct && !isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50" onClick={() => setViewProduct(null)}>
          <div className="bg-ink-1 border-l border-line w-full max-w-sm h-full flex flex-col overflow-y-auto admin-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
              <span className="text-[13px] font-semibold text-ink-text-1">Detalhes</span>
              <div className="flex items-center gap-2">
                <button onClick={() => { openEdit(viewProduct); setViewProduct(null); }} className="admin-button-ghost"><Edit2 size={11} /> Editar</button>
                <button onClick={() => setViewProduct(null)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="aspect-[4/3] bg-ink-3 rounded" />
              <div>
                <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{viewProduct.collection}</p>
                <p className="text-[16px] font-medium text-ink-text-1 mb-1">{viewProduct.name}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[16px] font-semibold text-accent-teal">{formatBRL(viewProduct.price)}</span>
                  {viewProduct.oldPrice && <span className="text-[11px] line-through text-ink-text-4">{formatBRL(viewProduct.oldPrice)}</span>}
                </div>
                <p className="text-[11px] text-ink-text-2 leading-[1.6]">{viewProduct.description}</p>
              </div>
              {viewProduct.variants.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">Variantes ({viewProduct.variants.length})</p>
                  <div className="space-y-1.5">
                    {viewProduct.variants.map((v, i) => (
                      <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded px-2.5 py-2 text-[11px]">
                        <span className="text-ink-text-1">{v.color} · {v.size}</span>
                        <span className={cn('font-medium', v.stock < 5 ? 'text-accent-red' : 'text-ink-text-2')}>{v.stock} un.</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
