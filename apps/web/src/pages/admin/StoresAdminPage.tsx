import { useState } from 'react';
import { Plus, MapPin, Clock, Edit2, X, Check } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { stores as initialStores, vendors, type Store } from '@/lib/mock';

const EMPTY_FORM = { name: '', address: '', city: '', hours: '' };

export function StoresAdminPage() {
  const [stores, setStores] = useState(initialStores);
  const [showModal, setShowModal] = useState(false);
  const [editStore, setEditStore] = useState<Store | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saved, setSaved] = useState(false);

  const openNew = () => {
    setForm(EMPTY_FORM);
    setEditStore(null);
    setShowModal(true);
  };

  const openEdit = (s: Store) => {
    setForm({ name: s.name, address: s.address, city: s.city, hours: s.hours });
    setEditStore(s);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!form.name || !form.address) return;
    if (editStore) {
      setStores((prev) => prev.map((s) => s.id === editStore.id ? { ...s, ...form } : s));
    } else {
      const newStore: Store = {
        id: `st${Date.now()}`,
        name: form.name,
        address: form.address,
        city: form.city,
        hours: form.hours,
        mapsUrl: '',
        wazeUrl: '',
        description: '',
      };
      setStores((prev) => [...prev, newStore]);
    }
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setShowModal(false);
      setEditStore(null);
      setForm(EMPTY_FORM);
    }, 800);
  };

  return (
    <>
      <AdminTopBar title="Lojas" subtitle={`${stores.length} lojas físicas`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <Card
          title="Unidades físicas"
          subtitle="Gerencie suas lojas e equipes"
          action={
            <button className="admin-button-primary" onClick={openNew}>
              <Plus size={11} /> Nova loja
            </button>
          }
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
                        background: i % 2 === 0
                          ? 'radial-gradient(circle at 30% 60%, #2C2C31, #0E0E10)'
                          : 'radial-gradient(circle at 70% 40%, #34343A, #161618)',
                      }}
                    />
                    <span className="absolute top-3 left-3 admin-pill bg-ink-0/60 text-ink-text-1 backdrop-blur">
                      Loja {String(i + 1).padStart(2, '0')}
                    </span>
                    <button
                      className="absolute top-3 right-3 admin-button-ghost"
                      onClick={() => openEdit(s)}
                    >
                      <Edit2 size={11} /> Editar
                    </button>
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
                        {team.length === 0 && <span className="text-[10px] text-ink-text-4">Sem equipe</span>}
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[10px]">
                        <div className="bg-ink-3 rounded px-2 py-1.5">
                          <p className="text-ink-text-3">Vendas</p>
                          <p className="text-ink-text-1 font-medium">
                            {team.reduce((sum, v) => sum + v.metrics.sales, 0)}
                          </p>
                        </div>
                        <div className="bg-ink-3 rounded px-2 py-1.5">
                          <p className="text-ink-text-3">Receita</p>
                          <p className="text-accent-teal font-medium">
                            R$ {(team.reduce((sum, v) => sum + v.metrics.revenue, 0) / 1000).toFixed(1)}K
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

      {/* Modal: Nova / Editar Loja */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-ink-2 border border-line rounded-lg p-6 w-full max-w-sm shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-[14px] font-semibold text-ink-text-1">
                {editStore ? 'Editar Loja' : 'Nova Loja'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-ink-text-3 hover:text-ink-text-1"><X size={16} /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Nome *</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Nome da loja" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Endereço *</label>
                <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Rua, número" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Cidade</label>
                <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Cidade, BA" className="admin-input w-full" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 block mb-1">Horário de funcionamento</label>
                <input value={form.hours} onChange={(e) => setForm({ ...form, hours: e.target.value })} placeholder="Seg–Sex 9h–20h · Sáb 9h–18h" className="admin-input w-full" />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="admin-button-ghost flex-1">Cancelar</button>
              <button
                onClick={handleSave}
                disabled={!form.name || !form.address}
                className={`admin-button-primary flex-1 disabled:opacity-40 disabled:cursor-not-allowed transition-all ${saved ? 'bg-accent-green' : ''}`}
              >
                {saved ? <><Check size={11} /> Salvo</> : 'Salvar loja'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
