import { Save, Bell, Lock, Globe, Palette, Database } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { useAuth } from '@/stores/auth';

export function SettingsPage() {
  const { user } = useAuth();
  return (
    <>
      <AdminTopBar title="Configurações" showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid lg:grid-cols-2 gap-2.5">
          <Card title="Perfil" subtitle="Suas informações de conta">
            <div className="space-y-3">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-medium text-lg"
                  style={{ background: user?.avatarColor ?? '#8B5CF6' }}
                >
                  {user?.initials ?? '?'}
                </div>
                <div>
                  <p className="text-[14px] font-medium text-ink-text-1">{user?.name}</p>
                  <p className="text-[11px] text-ink-text-3">{user?.email}</p>
                  <span className="admin-pill bg-accent-purple-dim text-accent-purple mt-1">{user?.role}</span>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Nome</label>
                <input className="admin-input w-full" defaultValue={user?.name} />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">E-mail</label>
                <input className="admin-input w-full" defaultValue={user?.email} />
              </div>
              <button className="admin-button-primary"><Save size={11} /> Salvar alterações</button>
            </div>
          </Card>

          <Card title="Preferências" subtitle="Notificações, tema e idioma">
            <div className="space-y-3">
              {[
                { icon: Bell, label: 'Notificações por e-mail', on: true },
                { icon: Bell, label: 'Notificações push', on: false },
                { icon: Palette, label: 'Tema escuro (admin)', on: true, locked: true },
                { icon: Globe, label: 'Idioma · Português (BR)', on: true, locked: true },
              ].map((opt, i) => (
                <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded p-3">
                  <div className="flex items-center gap-2.5">
                    <opt.icon size={13} className="text-ink-text-3" />
                    <span className="text-[12px] text-ink-text-1">{opt.label}</span>
                  </div>
                  <div
                    className={`relative w-9 h-5 rounded-full transition-colors ${opt.on ? 'bg-accent-blue' : 'bg-ink-4'}`}
                  >
                    <div
                      className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${opt.on ? 'translate-x-4' : 'translate-x-0.5'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Segurança" subtitle="Senha e acesso">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Senha atual</label>
                <input type="password" className="admin-input w-full" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Nova senha</label>
                <input type="password" className="admin-input w-full" placeholder="••••••••" />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Confirmar nova senha</label>
                <input type="password" className="admin-input w-full" placeholder="••••••••" />
              </div>
              <button className="admin-button-primary"><Lock size={11} /> Atualizar senha</button>
            </div>
          </Card>

          <Card title="Sistema" subtitle="Configurações gerais">
            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between py-1.5 border-b border-line">
                <span className="text-ink-text-3">Versão</span>
                <span className="text-ink-text-1 font-medium">v1.0.0</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-line">
                <span className="text-ink-text-3">Banco de dados</span>
                <span className="text-accent-green flex items-center gap-1">
                  <Database size={10} /> Conectado
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-line">
                <span className="text-ink-text-3">Último backup</span>
                <span className="text-ink-text-1">há 2 horas</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-ink-text-3">Ambiente</span>
                <span className="admin-pill bg-accent-amber-dim text-accent-amber">Produção</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
