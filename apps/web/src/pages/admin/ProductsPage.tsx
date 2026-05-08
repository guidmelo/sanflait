import { useState, useMemo, useRef } from 'react';
import { Plus, Search, Edit2, Eye, AlertTriangle, X, Check, Upload, Loader2, Trash2 } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct, type ApiProduct } from '@/hooks/useProducts';
import { useData } from '@/stores/data';
import { uploadProductImage, supabase } from '@/lib/supabase';
import { cn, formatBRL } from '@/lib/utils';

const HAS_API = !!(import.meta.env.VITE_API_URL);

type EditForm = {
  name: string; collection: string; category: string;
  price: string; oldPrice: string; badge: string; description: string;
};
const EMPTY_FORM: EditForm = { name: '', collection: '', category: '', price: '', oldPrice: '', badge: '', description: '' };
const COLLECTIONS = ['Primavera 2026', 'Inverno 2026', 'Essenciais', 'Novidades', 'Outlet'];
const CATEGORIES = ['Vestidos', 'Camisas', 'Blazers', 'Calças', 'Bermudas', 'Blusas', 'Casacos', 'Cintos', 'Acessórios', 'Outros'];

export function ProductsPage() {
  // API hooks (when backend is configured)
  const { data: apiProducts, isLoading } = useProducts();
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  // Local store fallback
  const { products: localProducts, addProduct: addLocal, updateProduct: updateLocal, removeProduct: removeLocal } = useData();

  // Use API products if available, otherwise local store
  const products = (HAS_API && apiProducts) ? apiProducts : localProducts;

  const [query, setQuery] = useState('');
  const [editProduct, setEditProduct] = useState<ApiProduct | null>(null);
  const [viewProduct, setViewProduct] = useState<ApiProduct | null>(null);
  const [showNew, setShowNew] = useState(false);
  const [form, setForm] = useState<EditForm>(EMPTY_FORM);
  const [pendingImages, setPendingImages] = useState<string[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return !q ? products : products.filter((p) => p.name.toLowerCase().includes(q) || (p.collection ?? '').toLowerCase().includes(q));
  }, [query, products]);

  const openEdit = (p: ApiProduct) => {
    const price = (p as unknown as { price?: number }).price ?? Number((p as ApiProduct).basePrice ?? 0);
    setForm({
      name: p.name, collection: p.collection ?? '', category: p.category,
      price: price.toString(),
      oldPrice: p.oldPrice ? p.oldPrice.toString() : '',
      badge: p.badge ?? '', description: p.description ?? '',
    });
    setPendingImages(p.images ?? []);
    setEditProduct(p);
    setViewProduct(null);
    setShowNew(false);
    setError(null);
  };

  const openNew = () => {
    setForm(EMPTY_FORM);
    setPendingImages([]);
    setShowNew(true);
    setEditProduct(null);
    setViewProduct(null);
    setError(null);
  };

  const handleImagePick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!supabase) {
      // Fallback: use local object URL for preview without Supabase
      const url = URL.createObjectURL(file);
      setPendingImages((prev) => [...prev, url]);
      return;
    }
    setUploadingImage(true);
    try {
      const url = await uploadProductImage(file);
      setPendingImages((prev) => [...prev, url]);
    } catch (err) {
      setError('Erro ao fazer upload da imagem. Verifique as configurações do Supabase.');
    } finally {
      setUploadingImage(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setSaving(true);
    setError(null);

    const payload = {
      name: form.name,
      collection: form.collection || 'Novidades',
      category: form.category || 'Outros',
      basePrice: parseFloat(form.price) || 0,
      oldPrice: form.oldPrice ? parseFloat(form.oldPrice) : null,
      badge: form.badge || null,
      description: form.description,
      images: pendingImages,
      active: true,
    };

    try {
      if (HAS_API) {
        if (editProduct) {
          await updateMutation.mutateAsync({ id: editProduct.id, ...payload });
        } else {
          const slug = form.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          await createMutation.mutateAsync({ ...payload, slug });
        }
      } else {
        // Local store fallback
        const slug = form.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
        if (editProduct) {
          updateLocal(editProduct.id, { ...payload, price: payload.basePrice, images: pendingImages, variants: editProduct.variants ?? [] });
        } else {
          addLocal({ id: `p${Date.now()}`, slug, price: payload.basePrice, images: pendingImages, variants: [], ...payload } as never);
        }
      }
      setSaved(true);
      setTimeout(() => { setSaved(false); setEditProduct(null); setShowNew(false); setForm(EMPTY_FORM); setPendingImages([]); }, 800);
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message;
      setError(msg ?? 'Erro ao salvar produto. Verifique as configurações da API.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover este produto?')) return;
    if (HAS_API) {
      await deleteMutation.mutateAsync(id);
    } else {
      removeLocal(id);
    }
    setViewProduct(null);
    setEditProduct(null);
  };

  const handleExport = () => {
    const rows = products.map((p) => {
      const price = (p as unknown as { price?: number }).price ?? Number(p.basePrice);
      return `${p.name};${p.collection ?? ''};${p.category};${price}`;
    }).join('\n');
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
            { label: 'Com foto', value: products.filter((p) => (p.images?.length ?? 0) > 0).length.toString(), accent: 'border-accent-green' },
            { label: 'Ticket médio', value: products.length > 0 ? formatBRL(products.reduce((s, p) => s + ((p as unknown as {price?: number}).price ?? Number(p.basePrice)), 0) / products.length) : 'R$ 0,00', accent: 'border-accent-teal' },
            { label: 'Com desconto', value: products.filter((p) => p.oldPrice).length.toString(), accent: 'border-accent-amber' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        {!HAS_API && (
          <div className="mb-3 bg-accent-amber-dim border border-accent-amber/30 rounded px-3 py-2 text-[11px] text-accent-amber">
            Modo offline — configure VITE_API_URL para sincronizar com o banco de dados em tempo real.
          </div>
        )}

        <Card
          title="Catálogo de produtos"
          subtitle="Gerencie SKUs, fotos e preços"
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
          {isLoading ? (
            <div className="py-12 flex items-center justify-center gap-2 text-ink-text-3 text-[11px]">
              <Loader2 size={14} className="animate-spin" /> Carregando produtos...
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-ink-text-3 text-[11px] mb-3">Nenhum produto ainda</p>
              <button className="admin-button-primary" onClick={openNew}><Plus size={11} /> Adicionar primeiro produto</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((p, i) => {
                const price = (p as unknown as { price?: number }).price ?? Number(p.basePrice);
                return (
                  <div key={p.id} className="bg-ink-2 border border-line rounded overflow-hidden hover:border-line-strong transition-colors">
                    <div className="aspect-[4/3] bg-ink-3 relative overflow-hidden">
                      {p.images?.[0]
                        ? <img src={p.images[0]} alt={p.name} className="absolute inset-0 w-full h-full object-cover" />
                        : <div className="absolute inset-0" style={{ background: ['radial-gradient(circle at 50% 30%, #2C2C31, #161618)', 'radial-gradient(circle at 30% 60%, #34343A, #0E0E10)', 'radial-gradient(circle at 70% 40%, #242428, #0E0E10)'][i % 3] }} />
                      }
                      {p.badge && <span className="absolute top-2 left-2 admin-pill bg-accent-purple text-white">{p.badge}</span>}
                    </div>
                    <div className="p-3">
                      <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{p.collection}</p>
                      <p className="text-[13px] font-medium text-ink-text-1 mb-1.5">{p.name}</p>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-[14px] font-semibold text-accent-teal">{formatBRL(price)}</span>
                        {p.oldPrice && <span className="text-[10px] line-through text-ink-text-4">{formatBRL(Number(p.oldPrice))}</span>}
                      </div>
                      <div className="flex gap-1.5">
                        <button className="flex-1 admin-button-ghost justify-center" onClick={() => { setViewProduct(p as unknown as ApiProduct); setEditProduct(null); setShowNew(false); }}>
                          <Eye size={11} /> Ver
                        </button>
                        <button className="flex-1 admin-button-ghost justify-center" onClick={() => openEdit(p as unknown as ApiProduct)}>
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

      {/* Edit / New panel */}
      {isEditOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-end z-50" onClick={() => { setEditProduct(null); setShowNew(false); }}>
          <div className="bg-ink-1 border-l border-line w-full max-w-sm h-full flex flex-col overflow-y-auto admin-scroll" onClick={(e) => e.stopPropagation()}>
            <div className="px-4 py-3 border-b border-line flex items-center justify-between flex-shrink-0">
              <span className="text-[13px] font-semibold text-ink-text-1">{editProduct ? 'Editar Produto' : 'Novo Produto'}</span>
              <button onClick={() => { setEditProduct(null); setShowNew(false); }} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="p-4 space-y-3 flex-1">
              {/* Image upload */}
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1.5">Fotos do produto</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {pendingImages.map((img, i) => (
                    <div key={i} className="relative w-16 h-16 rounded overflow-hidden border border-line">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setPendingImages((prev) => prev.filter((_, j) => j !== i))}
                        className="absolute top-0.5 right-0.5 bg-black/60 rounded-full p-0.5 text-white hover:bg-black/80"
                      >
                        <X size={8} />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => fileRef.current?.click()}
                    disabled={uploadingImage}
                    className="w-16 h-16 border border-dashed border-line rounded flex items-center justify-center text-ink-text-3 hover:border-accent-blue hover:text-accent-blue transition-colors disabled:opacity-50"
                  >
                    {uploadingImage ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                  </button>
                </div>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImagePick} />
                {!supabase && <p className="text-[10px] text-ink-text-3">Configure Supabase para upload permanente de fotos.</p>}
              </div>

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
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Preço antigo</label>
                  <input type="number" value={form.oldPrice} onChange={(e) => setForm({ ...form, oldPrice: e.target.value })} placeholder="0,00" className="admin-input w-full" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Badge (ex: -20%, Novo)</label>
                <input value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Novo" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Descrição</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descreva o produto..." rows={3} className="admin-input w-full resize-none" />
              </div>
              {error && (
                <div className="bg-accent-red-dim border border-accent-red/30 rounded px-3 py-2 text-[11px] text-accent-red flex items-start gap-2">
                  <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
                  {error}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-line flex gap-2 flex-shrink-0">
              {editProduct && (
                <button onClick={() => handleDelete(editProduct.id)} className="admin-button-ghost text-accent-red hover:bg-accent-red-dim">
                  <Trash2 size={11} />
                </button>
              )}
              <button onClick={() => { setEditProduct(null); setShowNew(false); }} className="admin-button-ghost flex-1">Cancelar</button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.price || saving}
                className={cn('admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed transition-all', saved && 'bg-accent-green')}
              >
                {saving ? <Loader2 size={11} className="animate-spin" /> : saved ? <Check size={11} /> : null}
                {saving ? 'Salvando...' : saved ? 'Salvo!' : 'Salvar'}
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
                <button onClick={() => openEdit(viewProduct)} className="admin-button-ghost"><Edit2 size={11} /> Editar</button>
                <button onClick={() => setViewProduct(null)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
              </div>
            </div>
            <div className="p-4 space-y-4">
              <div className="aspect-[4/3] bg-ink-3 rounded overflow-hidden">
                {viewProduct.images?.[0]
                  ? <img src={viewProduct.images[0]} alt={viewProduct.name} className="w-full h-full object-cover" />
                  : null
                }
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1">{viewProduct.collection}</p>
                <p className="text-[16px] font-medium text-ink-text-1 mb-1">{viewProduct.name}</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-[16px] font-semibold text-accent-teal">{formatBRL((viewProduct as unknown as {price?: number}).price ?? Number(viewProduct.basePrice))}</span>
                  {viewProduct.oldPrice && <span className="text-[11px] line-through text-ink-text-4">{formatBRL(Number(viewProduct.oldPrice))}</span>}
                </div>
                {viewProduct.description && <p className="text-[11px] text-ink-text-2 leading-[1.6]">{viewProduct.description}</p>}
              </div>
              {viewProduct.images && viewProduct.images.length > 1 && (
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">Fotos ({viewProduct.images.length})</p>
                  <div className="flex gap-2 flex-wrap">
                    {viewProduct.images.map((img, i) => (
                      <img key={i} src={img} alt="" className="w-14 h-14 object-cover rounded border border-line" />
                    ))}
                  </div>
                </div>
              )}
              {viewProduct.variants && viewProduct.variants.length > 0 && (
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">Variantes ({viewProduct.variants.length})</p>
                  <div className="space-y-1.5">
                    {viewProduct.variants.map((v, i) => (
                      <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded px-2.5 py-2 text-[11px]">
                        <span className="text-ink-text-1">{v.color} · {v.size}</span>
                        <span className="text-ink-text-3">{v.sku}</span>
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
