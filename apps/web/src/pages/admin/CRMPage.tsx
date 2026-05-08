import { useState } from 'react';
import { Plus, Phone, MapPin, ChevronRight } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { customers as initialCustomers, vendors, type Customer } from '@/lib/mock';
import { cn, relativeTime } from '@/lib/utils';

type Status = Customer['status'];

const COLUMNS: { id: Status; label: string; color: string; dimColor: string; textColor: string }[] = [
  { id: 'LEAD', label: 'Lead', color: 'bg-accent-blue', dimColor: 'bg-accent-blue-dim', textColor: 'text-accent-blue' },
  { id: 'EM_NEGOCIACAO', label: 'Em Negociação', color: 'bg-accent-amber', dimColor: 'bg-accent-amber-dim', textColor: 'text-accent-amber' },
  { id: 'CONVERTIDO', label: 'Convertido', color: 'bg-accent-green', dimColor: 'bg-accent-green-dim', textColor: 'text-accent-green' },
  { id: 'PERDIDO', label: 'Perdido', color: 'bg-accent-red', dimColor: 'bg-accent-red-dim', textColor: 'text-accent-red' },
];

const NEXT_STATUS: Record<Status, Status> = {
  LEAD: 'EM_NEGOCIACAO',
  EM_NEGOCIACAO: 'CONVERTIDO',
  CONVERTIDO: 'CONVERTIDO',
  PERDIDO: 'PERDIDO',
};

export function CRMPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const moveStatus = (id: string, newStatus: Status) => {
    setCustomers((prev) => prev.map((c) => c.id === id ? { ...c, status: newStatus } : c));
    setSelectedId(null);
  };

  const grouped = COLUMNS.map((col) => ({
    ...col,
    items: customers.filter((c) => c.status === col.id),
  }));

  const selected = selectedId ? customers.find((c) => c.id === selectedId) : null;

  return (
    <>
      <AdminTopBar title="CRM · Pipeline" subtitle={`${customers.length} contatos no funil`} showLive={false} />
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
                  <button className="text-ink-text-3 hover:text-ink-text-1 transition-colors" aria-label="Adicionar" title="Adicionar contato">
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
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[12px] font-medium text-ink-text-1 leading-tight">{c.name}</p>
                        </div>
                        <div className="space-y-1 text-[10px] text-ink-text-3 mb-2.5">
                          <div className="flex items-center gap-1.5"><Phone size={9} /> <span className="truncate">{c.phone}</span></div>
                          <div className="flex items-center gap-1.5"><MapPin size={9} /> <span>{c.neighborhood} · {c.age}a</span></div>
                        </div>

                        {/* Action buttons — visible on select */}
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
                              <span className="text-[10px] text-ink-text-2 truncate">{v?.name.split(' ')[0]}</span>
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
                <button onClick={() => setSelectedId(null)} className="text-ink-text-3 hover:text-ink-text-1 text-[16px] leading-none">×</button>
              </div>
              <div className="p-4 flex-1 overflow-y-auto admin-scroll space-y-4">
                <div>
                  <p className="text-[14px] font-semibold text-ink-text-1">{selected.name}</p>
                  <span className={cn('admin-pill mt-1.5', col.dimColor, col.textColor)}>
                    <span className={cn('w-1.5 h-1.5 rounded-full', col.color)} />{col.label}
                  </span>
                </div>
                <div className="space-y-2 text-[11px]">
                  <div><p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">Telefone</p><p className="text-ink-text-1">{selected.phone}</p></div>
                  <div><p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">E-mail</p><p className="text-ink-text-1 truncate">{selected.email}</p></div>
                  <div><p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">Bairro</p><p className="text-ink-text-1">{selected.neighborhood}</p></div>
                  <div><p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">Origem</p><p className="text-ink-text-1">{selected.source}</p></div>
                  {v && <div><p className="text-ink-text-3 text-[9px] uppercase tracking-wider mb-0.5">Vendedor</p><p className="text-ink-text-1">{v.name}</p></div>}
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
    </>
  );
}
