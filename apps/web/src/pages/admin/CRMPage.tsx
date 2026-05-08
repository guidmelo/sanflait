import { useState } from 'react';
import { Plus, Phone, MapPin, ChevronRight, X } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { useData } from '@/stores/data';
import { type Customer } from '@/lib/mock';
import { cn, relativeTime } from '@/lib/utils';

type Status = Customer['status'];

const COLUMNS: { id: Status; label: string; color: string; dimColor: string; textColor: string }[] = [
  { id: 'LEAD', label: 'Lead', color: 'bg-accent-blue', dimColor: 'bg-accent-blue-dim', textColor: 'text-accent-blue' },
  { id: 'EM_NEGOCIACAO', label: 'Em Negociação', color: 'bg-accent-amber', dimColor: 'bg-accent-amber-dim', textColor: 'text-accent-amber' },
  { id: 'CONVERTIDO', label: 'Convertido', color: 'bg-accent-green', dimColor: 'bg-accent-green-dim', textColor: 'text-accent-green' },
  { id: 'PERDIDO', label: 'Perdido', color: 'bg-accent-red', dimColor: 'bg-accent-red-dim', textColor: 'text-accent-red' },
];

const EMPTY_FORM = {
  name: '', phone: '', email: '', neighborhood: '', age: '',
  gender: 'FEMININO' as Customer['gender'],
  source: 'WhatsApp', vendorId: '',
};

export function CRMPage() {
  const { customers, vendors, addCustomer, updateCustomer } = useData();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newLeadStatus, setNewLeadStatus] = useState<Status>('LEAD');
  const [form, setForm] = useState(EMPTY_FORM);

  const moveStatus = (id: string, newStatus: Status) => {
    updateCustomer(id, { status: newStatus });
    setSelectedId(null);
  };

  const openNewLead = (status: Status = 'LEAD') => {
    setNewLeadStatus(status);
    setForm(EMPTY_FORM);
    setShowModal(true);
  };

  const handleAdd = () => {
    if (!form.name || !form.phone) return;
    addCustomer({
      id: `c${Date.now()}`,
      name: form.name,
      phone: form.phone,
      email: form.email,
      neighborhood: form.neighborhood,
      age: parseInt(form.age) || 25,
      gender: form.gender,
      status: newLeadStatus,
      source: form.source,
      vendorId: form.vendorId || (vendors[0]?.id ?? ''),
      createdAt: new Date().toISOString(),
    });
    setForm(EMPTY_FORM);
    setShowModal(false);
  };

  const grouped = COLUMNS.map((col) => ({
    ...col,
    items: customers.filter((c) => c.status === col.id),
  }));

  const selected = selectedId ? customers.find((c) => c.id === selectedId) : null;

  return (
    <>
      <AdminTopBar
        title="CRM · Pipeline"
        subtitle={`${customers.length} contatos no funil`}
        showLive={false}
        onExport={() => {
          const rows = customers.map((c) => `${c.name};${c.phone};${c.status};${c.source}`).join('\n');
          const blob = new Blob([`Nome;Telefone;Status;Origem\n${rows}`], { type: 'text/csv' });
          const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'crm.csv'; a.click();
        }}
      />
      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Quick actions bar */}
        <div className="px-4 py-2 border-b border-line flex items-center justify-between bg-ink-1">
          <p className="text-[11px] text-ink-text-3">Clique em um card para mover de estágio</p>
          <button className="admin-button-primary" onClick={() => openNewLead('LEAD')}>
            <Plus size={11} /> Novo Lead
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Kanban board */}
          <div className="flex-1 overflow-y-auto admin-scroll p-4">
            <div className="grid grid-cols-4 gap-2.5 h-full">
              {grouped.map((col) => (
                <div key={col.id} className="bg-ink-1 border border-line rounded-md flex flex-col min-h-[400px]">
                  <div className="px-3 py-2.5 border-b border-line flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={cn('w-2 h-2 rounded-full', col.color)} />
                      <span className="text-[12px] font-medium text-ink-text-1">{col.label}</span>
                      <span className="text-[10px] text-ink-text-3">({col.items.length})</span>
                    </div>
                    <button
                      className="text-ink-text-3 hover:text-ink-text-1 transition-colors"
                      aria-label="Adicionar"
                      onClick={() => openNewLead(col.id)}
                      title={`Adicionar em ${col.label}`}
                    >
                      <Plus size={12} />
                    </button>
                  </div>

                  <div className="p-2 flex-1 space-y-2">
                    {col.items.length === 0 ? (
                      <div className="text-center text-[11px] text-ink-text-4 py-12">Sem contatos</div>
                    ) : col.items.map((c) => {
                      const v = vendors.find((x) => x.id === c.vendorId);
                      const isSelected = selectedId === c.id;
                      return (
                        <div
                          key={c.id}
                          onClick={() => setSelectedId(isSelected ? null : c.id)}
                          className={cn(
                            'bg-ink-2 border rounded p-2.5 cursor-pointer transition-all',
                            isSelected ? 'border-accent-blue shadow-lg shadow-accent-blue/10' : 'border-line hover:border-line-strong',
                          )}
                        >
                          <p className="text-[12px] font-medium text-ink-text-1 leading-tight mb-2">{c.name}</p>
                          <div className="space-y-1 text-[10px] text-ink-text-3 mb-2.5">
                            <div className="flex items-center gap-1.5"><Phone size={9} /> <span className="truncate">{c.phone}</span></div>
                            {c.neighborhood && <div className="flex items-center gap-1.5"><MapPin size={9} /> <span>{c.neighborhood} · {c.age}a</span></div>}
                          </div>

                          {isSelected && (
                            <div className="pt-2 border-t border-line space-y-1.5">
                              <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1.5">Mover para:</p>
                              {COLUMNS.filter((x) => x.id !== col.id).map((target) => (
                                <button
                                  key={target.id}
                                  onClick={(e) => { e.stopPropagation(); moveStatus(c.id, target.id); }}
                                  className={cn('w-full flex items-center justify-between px-2 py-1.5 rounded text-[10px] font-medium transition-colors', target.dimColor, target.textColor, 'hover:opacity-80')}
                                >
                                  <span>{target.label}</span>
                                  <ChevronRight size={10} />
                                </button>
                              ))}
                            </div>
                          )}

                          {!isSelected && (
                            <div className="flex items-center justify-between pt-2 border-t border-line">
                              <div className="flex items-center gap-1.5">
                                {v && (
                                  <div className="w-4 h-4 rounded-full text-white text-[7px] font-semibold flex items-center justify-center" style={{ background: v.color }}>
                                    {v.initials}
                                  </div>
                                )}
                                <span className="text-[10px] text-ink-text-2 truncate">{v?.name.split(' ')[0] ?? c.source}</span>
                              </div>
                              <span className="text-[10px] text-ink-text-3">{relativeTime(c.createdAt)}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          {selected && (() => {
            const v = vendors.find((x) => x.id === selected.vendorId);
            const col = COLUMNS.find((c) => c.id === selected.status)!;
            return (
              <div className="w-64 border-l border-line bg-ink-1 flex flex-col flex-shrink-0">
                <div className="px-4 py-3 border-b border-line flex items-center justify-between">
                  <span className="text-[12px] font-semibold text-ink-text-1">Detalhes</span>
                  <button onClick={() => setSelectedId(null)} className="text-ink-text-3 hover:text-ink-text-1"><X size={14} /></button>
                </div>
                <div className="p-4 flex-1 overflow-y-auto admin-scroll space-y-4">
                  <div>
                    <p className="text-[14px] font-semibold text-ink-text-1">{selected.name}</p>
                    <span className={cn('admin-pill mt-1.5', col.dimColor, col.textColor)}>
                      <span className={cn('w-1.5 h-1.5 rounded-full', col.color)} /> {col.label}
                    </span>
                  </div>
                  <div className="space-y-2 text-[11px]">
                    {[
                      { label: 'Telefone', val: selected.phone },
                      { label: 'E-mail', val: selected.email },
                      { label: 'Bairro', val: selected.neighborhood },
                      { label: 'Origem', val: selected.source },
                      ...(v ? [{ label: 'Vendedor', val: v.name }] : []),
                    ].filter(x => x.val).map(({ label, val }) => (
                      <div key={label}>
                        <p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">{label}</p>
                        <p className="text-ink-text-1 truncate">{val}</p>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">Mover para:</p>
                    <div className="space-y-1.5">
                      {COLUMNS.filter((c) => c.id !== selected.status).map((target) => (
                        <button key={target.id} onClick={() => moveStatus(selected.id, target.id)} className={cn('w-full flex items-center justify-between px-3 py-2 rounded text-[11px] font-medium transition-colors', target.dimColor, target.textColor, 'hover:opacity-80')}>
                          {target.label} <ChevronRight size={11} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Modal: Novo Lead */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-ink-2 border border-line rounded-lg p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-[14px] font-semibold text-ink-text-1">Novo Contato</h2>
              <button onClick={() => setShowModal(false)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="mb-4 flex gap-2">
              {COLUMNS.map((col) => (
                <button
                  key={col.id}
                  onClick={() => setNewLeadStatus(col.id)}
                  className={cn('flex-1 py-1 rounded text-[9px] uppercase tracking-wider font-medium transition-colors', newLeadStatus === col.id ? `${col.color} text-white` : `${col.dimColor} ${col.textColor}`)}
                >
                  {col.label}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Nome *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome completo" className="admin-input w-full" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Telefone *</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="(81) 99900-0000" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Idade</label>
                  <input type="number" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} placeholder="30" className="admin-input w-full" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Bairro</label>
                  <input value={form.neighborhood} onChange={(e) => setForm({ ...form, neighborhood: e.target.value })} placeholder="Bairro" className="admin-input w-full" />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Origem</label>
                  <select value={form.source} onChange={(e) => setForm({ ...form, source: e.target.value })} className="admin-input w-full">
                    {['WhatsApp', 'Instagram', 'Indicação', 'Loja física', 'Site', 'TikTok'].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Vendedor</label>
                <select value={form.vendorId} onChange={(e) => setForm({ ...form, vendorId: e.target.value })} className="admin-input w-full">
                  <option value="">Sem vendedor</option>
                  {vendors.map((v) => <option key={v.id} value={v.id}>{v.name.split(' ')[0]}</option>)}
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="admin-button-ghost flex-1">Cancelar</button>
              <button onClick={handleAdd} disabled={!form.name || !form.phone} className="admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed">Salvar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
