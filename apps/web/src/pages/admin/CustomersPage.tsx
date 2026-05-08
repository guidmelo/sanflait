import { useState, useMemo } from 'react';
import { Plus, Search, FileDown, Phone, Mail, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { customers as initialCustomers, vendors, type Customer } from '@/lib/mock';
import { cn, relativeTime } from '@/lib/utils';

const STATUS_STYLES = {
  LEAD: 'bg-accent-blue-dim text-accent-blue',
  EM_NEGOCIACAO: 'bg-accent-amber-dim text-accent-amber',
  CONVERTIDO: 'bg-accent-green-dim text-accent-green',
  PERDIDO: 'bg-accent-red-dim text-accent-red',
};
const STATUS_LABEL = {
  LEAD: 'Lead',
  EM_NEGOCIACAO: 'Negociando',
  CONVERTIDO: 'Convertido',
  PERDIDO: 'Perdido',
};

const EMPTY_FORM = { name: '', phone: '', email: '', neighborhood: '', age: '', gender: 'FEMININO' as Customer['gender'], source: 'Instagram', vendorId: '', status: 'LEAD' as Customer['status'] };

export function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return customers.filter((c) => {
      const matchQ = !q || c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.neighborhood.toLowerCase().includes(q);
      const matchS = !statusFilter || c.status === statusFilter;
      return matchQ && matchS;
    });
  }, [customers, query, statusFilter]);

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    const newCustomer: Customer = {
      id: `c${Date.now()}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      neighborhood: form.neighborhood,
      age: parseInt(form.age) || 30,
      gender: form.gender,
      status: form.status,
      source: form.source,
      vendorId: form.vendorId || (vendors[0]?.id ?? ''),
      createdAt: new Date().toISOString(),
    };
    setCustomers((prev) => [newCustomer, ...prev]);
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  return (
    <>
      <AdminTopBar title="Clientes" subtitle={`${filtered.length} de ${customers.length} contatos`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total de clientes', value: customers.length.toString(), accent: 'border-accent-blue' },
            { label: 'Convertidos', value: customers.filter((c) => c.status === 'CONVERTIDO').length.toString(), accent: 'border-accent-green' },
            { label: 'Em negociação', value: customers.filter((c) => c.status === 'EM_NEGOCIACAO').length.toString(), accent: 'border-accent-amber' },
            { label: 'Leads', value: customers.filter((c) => c.status === 'LEAD').length.toString(), accent: 'border-accent-purple' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Lista de clientes"
          subtitle="Filtre por nome, bairro ou status"
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
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="admin-button-ghost cursor-pointer text-[11px]">
                <option value="">Todos</option>
                <option value="LEAD">Lead</option>
                <option value="EM_NEGOCIACAO">Em negociação</option>
                <option value="CONVERTIDO">Convertido</option>
                <option value="PERDIDO">Perdido</option>
              </select>
              <button className="admin-button-ghost" onClick={() => {
                const rows = filtered.map((c) => `${c.name};${c.phone};${c.neighborhood};${c.status}`).join('\n');
                const blob = new Blob([`Nome;Telefone;Bairro;Status\n${rows}`], { type: 'text/csv' });
                const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'clientes.csv'; a.click();
              }}><FileDown size={11} /> Excel</button>
              <button className="admin-button-primary" onClick={() => setShowModal(true)}><Plus size={11} /> Novo cliente</button>
            </>
          }
        >
          <div className="overflow-x-auto -mx-4">
            <table className="w-full text-[11px]">
              <thead>
                <tr className="text-[9px] uppercase tracking-wider text-ink-text-3 border-b border-line">
                  <th className="text-left py-2 px-4">Cliente</th>
                  <th className="text-left py-2">Contato</th>
                  <th className="text-left py-2">Bairro</th>
                  <th className="text-center py-2">Idade</th>
                  <th className="text-left py-2">Origem</th>
                  <th className="text-left py-2">Vendedor</th>
                  <th className="text-center py-2">Status</th>
                  <th className="text-right py-2 px-4">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={8} className="py-8 text-center text-ink-text-3">Nenhum cliente encontrado</td></tr>
                ) : filtered.map((c) => {
                  const v = vendors.find((x) => x.id === c.vendorId);
                  return (
                    <tr key={c.id} className="border-b border-line/50 hover:bg-ink-3 transition-colors">
                      <td className="py-2.5 px-4">
                        <div>
                          <p className="text-ink-text-1 font-medium">{c.name}</p>
                          <p className="text-ink-text-3 text-[10px]">{c.gender}</p>
                        </div>
                      </td>
                      <td className="py-2.5">
                        <div className="space-y-0.5 text-ink-text-2">
                          <div className="flex items-center gap-1"><Phone size={9} /> {c.phone}</div>
                          <div className="flex items-center gap-1 text-[10px]"><Mail size={9} /> {c.email}</div>
                        </div>
                      </td>
                      <td className="py-2.5 text-ink-text-2">{c.neighborhood}</td>
                      <td className="py-2.5 text-center text-ink-text-2">{c.age}</td>
                      <td className="py-2.5 text-ink-text-2">{c.source}</td>
                      <td className="py-2.5">
                        {v && (
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full text-white text-[7px] font-semibold flex items-center justify-center" style={{ background: v.color }}>{v.initials}</div>
                            <span className="text-ink-text-2 text-[10px]">{v.name.split(' ')[0]}</span>
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 text-center">
                        <span className={cn('admin-pill', STATUS_STYLES[c.status])}>{STATUS_LABEL[c.status]}</span>
                      </td>
                      <td className="py-2.5 text-right text-ink-text-3 px-4">{relativeTime(c.createdAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal: Novo Cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-ink-2 border border-line rounded-lg p-6 w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-ink-text-1">Novo Cliente</h2>
              <button onClick={() => setShowModal(false)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Nome *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" className="admin-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Telefone *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(75) 99900-0000" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Idade</label>
                  <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="30" className="admin-input w-full" />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">E-mail</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@exemplo.com" className="admin-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Bairro</label>
                  <input value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} placeholder="Bairro" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Gênero</label>
                  <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value as Customer['gender'] })} className="admin-input w-full">
                    <option value="FEMININO">Feminino</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="OUTRO">Outro</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Origem</label>
                  <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="admin-input w-full">
                    <option>Instagram</option>
                    <option>WhatsApp</option>
                    <option>Indicação</option>
                    <option>Loja física</option>
                    <option>Site</option>
                    <option>TikTok</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Vendedor</label>
                  <select value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })} className="admin-input w-full">
                    <option value="">Sem vendedor</option>
                    {vendors.map((v) => <option key={v.id} value={v.id}>{v.name.split(' ')[0]}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Status inicial</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Customer['status'] })} className="admin-input w-full">
                  <option value="LEAD">Lead</option>
                  <option value="EM_NEGOCIACAO">Em negociação</option>
                  <option value="CONVERTIDO">Convertido</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="admin-button-ghost flex-1">Cancelar</button>
              <button onClick={handleAdd} disabled={!form.name || !form.phone} className="admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">Salvar cliente</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
