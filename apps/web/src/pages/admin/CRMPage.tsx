import { Plus, Phone, Mail, MapPin } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { customers, vendors } from '@/lib/mock';
import { cn, relativeTime } from '@/lib/utils';

const COLUMNS = [
  { id: 'LEAD', label: 'Lead', color: 'bg-accent-blue', dimColor: 'bg-accent-blue-dim' },
  { id: 'EM_NEGOCIACAO', label: 'Em Negociação', color: 'bg-accent-amber', dimColor: 'bg-accent-amber-dim' },
  { id: 'CONVERTIDO', label: 'Convertido', color: 'bg-accent-green', dimColor: 'bg-accent-green-dim' },
  { id: 'PERDIDO', label: 'Perdido', color: 'bg-accent-red', dimColor: 'bg-accent-red-dim' },
] as const;

export function CRMPage() {
  const grouped = COLUMNS.map((col) => ({
    ...col,
    items: customers.filter((c) => c.status === col.id),
  }));

  return (
    <>
      <AdminTopBar title="CRM · Pipeline" subtitle={`${customers.length} contatos no funil`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5">
          {grouped.map((col) => (
            <div key={col.id} className="bg-ink-1 border border-line rounded-md flex flex-col">
              {/* Column header */}
              <div className="px-3 py-2.5 border-b border-line flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', col.color)} />
                  <span className="text-[12px] font-medium text-ink-text-1">{col.label}</span>
                  <span className="text-[10px] text-ink-text-3">({col.items.length})</span>
                </div>
                <button className="text-ink-text-3 hover:text-ink-text-1" aria-label="Adicionar">
                  <Plus size={12} />
                </button>
              </div>

              {/* Cards */}
              <div className="p-2 flex-1 space-y-2 min-h-[240px]">
                {col.items.length === 0 ? (
                  <div className="text-center text-[11px] text-ink-text-4 py-12">
                    Sem contatos nesta etapa
                  </div>
                ) : (
                  col.items.map((c) => {
                    const v = vendors.find((x) => x.id === c.vendorId);
                    return (
                      <div
                        key={c.id}
                        className="bg-ink-2 border border-line rounded p-2.5 hover:border-line-strong cursor-pointer transition-colors group"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <p className="text-[12px] font-medium text-ink-text-1 leading-tight">
                            {c.name}
                          </p>
                          <span className={cn('admin-pill', col.dimColor, `text-[8px]`)}>
                            <span className={cn('w-1 h-1 rounded-full', col.color)} />
                            {col.label}
                          </span>
                        </div>
                        <div className="space-y-1 text-[10px] text-ink-text-3 mb-2.5">
                          <div className="flex items-center gap-1.5">
                            <Phone size={9} /> <span className="truncate">{c.phone}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <MapPin size={9} /> <span>{c.neighborhood} · {c.age}a</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-2 border-t border-line">
                          <div className="flex items-center gap-1.5">
                            {v && (
                              <div
                                className="w-4 h-4 rounded-full text-white text-[7px] font-semibold flex items-center justify-center"
                                style={{ background: v.color }}
                              >
                                {v.initials}
                              </div>
                            )}
                            <span className="text-[10px] text-ink-text-2 truncate">
                              {v?.name.split(' ')[0]}
                            </span>
                          </div>
                          <span className="text-[10px] text-ink-text-3">
                            {relativeTime(c.createdAt)}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
