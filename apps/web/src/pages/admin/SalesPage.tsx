import { useState, useMemo } from 'react';
import { Plus, Search, FileDown, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { sales as initialSales, vendors, customers, type Sale } from '@/lib/mock';
import { formatBRL, relativeTime } from '@/lib/utils';
import { cn } from '@/lib/utils';

const STATUS_STYLES = {
  CONVERTIDO: 'bg-accent-green-dim text-accent-green',
  EM_NEGOCIACAO: 'bg-accent-amber-dim text-accent-amber',
  PERDIDO: 'bg-accent-red-dim text-accent-red',
};
const STATUS_LABEL: Record<string, string> = {
  CONVERTIDO: 'Convertido',
  EM_NEGOCIACAO: 'Negociando',
  PERDIDO: 'Perdido',
};

const EMPTY_FORM = { customerId: '', vendorId: '', amount: '', description: '', channel: 'Loja física', status: 'CONVERTIDO' as Sale['status'] };

export function SalesPage() {
  const [sales, setSales] = useState(initialSales);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return sales.filter((s) => {
      const matchQ = !q || s.customerName.toLowerCase().includes(q) || s.vendorName.toLowerCase().includes(q) || s.description.toLowerCase().includes(q);
      const matchS = !statusFilter || s.status === statusFilter;
      return matchQ && matchS;
    });
  }, [sales, query, statusFilter]);

  const handleAdd = () => {
    if (!form.customerId || !form.amount) return;
    const customer = customers.find((c) => c.id === form.customerId);
    const vendor = vendors.find((v) => v.id === form.vendorId);
    const newSale: Sale = {
      id: `s${Date.now()}`,
      customerId: form.customerId,
      customerName: customer?.name ?? '—',
      vendorId: form.vendorId,
      vendorName: vendor?.name ?? '—',
      amount: parseFloat(form.amount),
      description: form.description || 'Produto',
      channel: form.channel,
      status: form.status,
      createdAt: new Date().toISOString(),
    };
    setSales((prev) => [newSale, ...prev]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  const totalRevenue = sales.filter((s) => s.status === 'CONVERTIDO').reduce((acc, s) => acc + s.amount, 0);

  return (
    <>
      <AdminTopBar title="Vendas" subtitle={`${filtered.length} de ${sales.length} registros`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total convertido', value: formatBRL(totalRevenue), accent: 'border-accent-teal' },
            { label: 'Convertidas', value: sales.filter((s) => s.status === 'CONVERTIDO').length.toString(), accent: 'border-accent-green' },
            { label: 'Em negociação', value: sales.filter((s) => s.status === 'EM_NEGOCIACAO').length.toString(), accent: 'border-accent-amber' },
            { label: 'Perdidas', value: sales.filter((s) => s.status === 'PERDIDO').length.toString(), accent: 'border-accent-red' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Todas as vendas"
          subtitle="Filtre por nome, vendedor ou status"
          action={
            <>
              <div className="flex items-center gap-1.5 bg-ink-3 border border-line rounded px-2 py-1">
                <Search size={11} className="text-ink-text-3" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar..."
                  className="bg-transparent outline-none text-[11px] w-28 text-ink-text-1"
                />
                {query && <button onClick={() => setQuery('')}><X size={10} className="text-ink-text-3 hover:text-ink-text-1" /></button>}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-button-ghost cursor-pointer text-[11px]"
              >
                <option value="">Todos os status</option>
                <option value="CONVERTIDO">Convertido</option>
                <option value="EM_NEGOCIACAO">Em negociação</option>
                <option value="PERDIDO">Perdido</option>
              </select>
              <button className="admin-button-ghost" onClick={() => {
                const rows = filtered.map((s) => `${s.customerName};${s.vendorName};${s.amount};${s.status};${s.createdAt}`).join('\n');
                const blob = new Blob([`Cliente;Vendedor;Valor;Status;Data\n${rows}`], { type: 'text/csv' });
                const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'vendas.csv'; a.click();
              }}><FileDown size={11} /> Excel</button>
              <button className="admin-button-primary" onClick={() => setShowModal(true)}><Plus size={11} /> Nova venda</button>
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
                {filtered.length === 0 ? (
                  <tr><td colSpan={7} className="py-8 text-center text-ink-text-3">Nenhuma venda encontrada</td></tr>
                ) : filtered.map((s) => (
                  <tr key={s.id} className="border-b border-line/50 hover:bg-ink-3 transition-colors">
                    <td className="py-2.5 px-4 text-ink-text-1 font-medium">{s.customerName}</td>
                    <td className="py-2.5 text-ink-text-2">{s.description}</td>
                    <td className="py-2.5 text-ink-text-2">{s.vendorName}</td>
                    <td className="py-2.5 text-ink-text-3">{s.channel}</td>
                    <td className="py-2.5 text-right text-ink-text-1 font-medium">{formatBRL(s.amount)}</td>
                    <td className="py-2.5 text-center">
                      <span className={cn('admin-pill', STATUS_STYLES[s.status])}>{STATUS_LABEL[s.status]}</span>
                    </td>
                    <td className="py-2.5 text-right text-ink-text-3 px-4">{relativeTime(s.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal: Nova Venda */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-ink-2 border border-line rounded-lg p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-ink-text-1">Nova Venda</h2>
              <button onClick={() => setShowModal(false)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Cliente *</label>
                <select value={form.customerId} onChange={(e) => setForm({ ...form, customerId: e.target.value })} className="admin-input w-full">
                  <option value="">Selecionar cliente</option>
                  {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Vendedor</label>
                <select value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })} className="admin-input w-full">
                  <option value="">Selecionar vendedor</option>
                  {vendors.map((v) => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Produto / Descrição</label>
                <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Ex: Vestido Midi Linen" className="admin-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Valor (R$) *</label>
                  <input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} placeholder="0,00" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Canal</label>
                  <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} className="admin-input w-full">
                    <option>Loja física</option>
                    <option>WhatsApp</option>
                    <option>Instagram</option>
                    <option>Site</option>
                    <option>Indicação</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Sale['status'] })} className="admin-input w-full">
                  <option value="CONVERTIDO">Convertido</option>
                  <option value="EM_NEGOCIACAO">Em negociação</option>
                  <option value="PERDIDO">Perdido</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="admin-button-ghost flex-1">Cancelar</button>
              <button onClick={handleAdd} disabled={!form.customerId || !form.amount} className="admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">Salvar venda</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
