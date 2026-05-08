import { useState } from 'react';
import { Plus, Copy, ExternalLink, Trophy, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { vendors as initialVendors, stores, type Vendor } from '@/lib/mock';
import { cn, formatBRL, formatPct } from '@/lib/utils';

const AVATAR_COLORS = ['#3B82F6', '#8B5CF6', '#14B8A6', '#F59E0B', '#EF4444', '#10B981'];

const EMPTY_FORM = { name: '', email: '', phone: '', storeId: '' };

export function VendorsPage() {
  const [vendors, setVendors] = useState(initialVendors);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [copied, setCopied] = useState<string | null>(null);

  const sorted = [...vendors].sort((a, b) => b.metrics.revenue - a.metrics.revenue);

  const handleCopy = (slug: string) => {
    navigator.clipboard.writeText(`https://sanflait.com/r/${slug}`);
    setCopied(slug);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleAdd = () => {
    if (!form.name || !form.email) return;
    const initials = form.name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();
    const slug = form.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const color = AVATAR_COLORS[vendors.length % AVATAR_COLORS.length];
    const newVendor: Vendor = {
      id: `v${Date.now()}`,
      name: form.name,
      email: form.email,
      phone: form.phone,
      avatar: '',
      slug,
      initials,
      color,
      storeId: form.storeId || (stores[0]?.id ?? ''),
      metrics: { sales: 0, revenue: 0, conversion: 0, leads: 0 },
    };
    setVendors((prev) => [...prev, newVendor]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  return (
    <>
      <AdminTopBar title="Vendedores" subtitle={`${vendors.length} ativos`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total ativos', value: vendors.length.toString(), accent: 'border-accent-blue' },
            { label: 'Vendas (mês)', value: vendors.reduce((s, v) => s + v.metrics.sales, 0).toString(), accent: 'border-accent-green' },
            { label: 'Receita (mês)', value: formatBRL(vendors.reduce((s, v) => s + v.metrics.revenue, 0)), accent: 'border-accent-teal' },
            { label: 'Conversão média', value: `${(vendors.reduce((s, v) => s + v.metrics.conversion, 0) / Math.max(1, vendors.length) * 100).toFixed(1)}%`, accent: 'border-accent-purple' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Lista de vendedores"
          subtitle="Cada um possui um link único de rastreio (last-click attribution)"
          action={
            <button className="admin-button-primary" onClick={() => setShowModal(true)}>
              <Plus size={11} /> Novo vendedor
            </button>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sorted.map((v, i) => (
              <div key={v.id} className="bg-ink-2 border border-line rounded p-4 hover:border-line-strong transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full text-white text-[14px] font-semibold flex items-center justify-center flex-shrink-0" style={{ background: v.color }}>
                    {v.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[14px] font-medium text-ink-text-1">{v.name}</p>
                      {i < 3 && (
                        <Trophy
                          size={12}
                          className={i === 0 ? 'text-accent-amber' : i === 1 ? 'text-ink-text-2' : 'text-ink-text-3'}
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-ink-text-3">{v.email}</p>
                    <p className="text-[10px] text-ink-text-3">{v.phone}</p>
                  </div>
                  <span className="admin-pill bg-accent-blue-dim text-accent-blue">#{i + 1}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Vendas</p>
                    <p className="text-[13px] font-semibold text-ink-text-1">{v.metrics.sales}</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Receita</p>
                    <p className="text-[13px] font-semibold text-accent-teal">R$ {(v.metrics.revenue / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Conv.</p>
                    <p className="text-[13px] font-semibold text-accent-amber">{formatPct(v.metrics.conversion)}</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Leads</p>
                    <p className="text-[13px] font-semibold text-ink-text-1">{v.metrics.leads}</p>
                  </div>
                </div>

                <div className="bg-ink-3 border border-line rounded p-2.5">
                  <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1.5">Link único de rastreio</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[10px] text-accent-blue truncate">
                      sanflait.com/r/{v.slug}
                    </code>
                    <button
                      onClick={() => handleCopy(v.slug)}
                      className={cn('flex-shrink-0 transition-colors', copied === v.slug ? 'text-accent-green' : 'text-ink-text-3 hover:text-ink-text-1')}
                      aria-label="Copiar"
                    >
                      <Copy size={11} />
                    </button>
                    <a
                      href={`/r/${v.slug}`}
                      target="_blank"
                      rel="noopener"
                      className="text-ink-text-3 hover:text-ink-text-1 flex-shrink-0"
                      aria-label="Abrir"
                    >
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Modal: Novo Vendedor */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-ink-2 border border-line rounded-lg p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-ink-text-1">Novo Vendedor</h2>
              <button onClick={() => setShowModal(false)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Nome *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">E-mail *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@sanflait.com" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Telefone</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(81) 99900-0000" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Loja</label>
                <select value={form.storeId} onChange={(e) => setForm({ ...form, storeId: e.target.value })} className="admin-input w-full">
                  <option value="">Selecionar loja</option>
                  {stores.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="admin-button-ghost flex-1">Cancelar</button>
              <button onClick={handleAdd} disabled={!form.name || !form.email} className="admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
