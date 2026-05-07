import { Plus, MapPin, Clock, Edit2 } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { stores, vendors } from '@/lib/mock';

export function StoresAdminPage() {
  return (
    <>
      <AdminTopBar title="Lojas" subtitle={`${stores.length} lojas físicas`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <Card
          title="Unidades físicas"
          subtitle="Gerencie suas lojas e equipes"
          action={<button className="admin-button-primary"><Plus size={11} /> Nova loja</button>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {stores.map((s, i) => {
              const team = vendors.filter((v) => v.storeId === s.id);
              return (
                <div key={s.id} className="bg-ink-2 border border-line rounded overflow-hidden hover:border-line-strong transition-colors">
                  <div className="aspect-[16/9] bg-ink-3 relative overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: i === 0
                          ? 'radial-gradient(circle at 30% 60%, #2C2C31, #0E0E10)'
                          : 'radial-gradient(circle at 70% 40%, #34343A, #161618)',
                      }}
                    />
                    <span className="absolute top-3 left-3 admin-pill bg-ink-0/60 text-ink-text-1 backdrop-blur">
                      Loja {String(i + 1).padStart(2, '0')}
                    </span>
                    <button className="absolute top-3 right-3 admin-button-ghost"><Edit2 size={11} /> Editar</button>
                  </div>
                  <div className="p-4">
                    <h3 className="text-[15px] font-medium text-ink-text-1 mb-2">{s.name}</h3>
                    <div className="space-y-1.5 text-[11px] text-ink-text-2 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin size={11} className="mt-0.5 text-ink-text-3" />
                        <span>{s.address} · {s.city}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={11} className="text-ink-text-3" /> {s.hours}
                      </div>
                    </div>

                    <div className="border-t border-line pt-3">
                      <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-2">
                        Equipe ({team.length})
                      </p>
                      <div className="flex -space-x-2 mb-3">
                        {team.map((v) => (
                          <div
                            key={v.id}
                            className="w-7 h-7 rounded-full text-white text-[9px] font-semibold flex items-center justify-center border-2 border-ink-2"
                            style={{ background: v.color }}
                            title={v.name}
                          >
                            {v.initials}
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-ink-3 rounded px-2 py-1.5">
                          <p className="text-ink-text-3">Vendas</p>
                          <p className="text-ink-text-1 font-medium">
                            {team.reduce((s, v) => s + v.metrics.sales, 0)}
                          </p>
                        </div>
                        <div className="bg-ink-3 rounded px-2 py-1.5">
                          <p className="text-ink-text-3">Receita</p>
                          <p className="text-accent-teal font-medium">
                            R$ {(team.reduce((s, v) => s + v.metrics.revenue, 0) / 1000).toFixed(1)}K
                          </p>
                        </div>
                      </div>
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
