import { useState } from 'react';
import { Save, Bell, Lock, Globe, Palette, Database, Check } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { useAuth } from '@/stores/auth';

export function SettingsPage() {
  const { user } = useAuth();

  const [profileName, setProfileName] = useState(user?.name ?? '');
  const [profileEmail, setProfileEmail] = useState(user?.email ?? '');
  const [profileSaved, setProfileSaved] = useState(false);

  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' });
  const [passwordMsg, setPasswordMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);

  const [notifs, setNotifs] = useState({ email: true, push: false });

  const handleProfileSave = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 2000);
  };

  const handlePasswordUpdate = () => {
    if (!passwords.current) {
      setPasswordMsg({ type: 'err', text: 'Informe a senha atual.' });
      return;
    }
    if (passwords.next.length < 6) {
      setPasswordMsg({ type: 'err', text: 'A nova senha deve ter ao menos 6 caracteres.' });
      return;
    }
    if (passwords.next !== passwords.confirm) {
      setPasswordMsg({ type: 'err', text: 'As senhas não coincidem.' });
      return;
    }
    setPasswordMsg({ type: 'ok', text: 'Senha atualizada com sucesso.' });
    setPasswords({ current: '', next: '', confirm: '' });
    setTimeout(() => setPasswordMsg(null), 3000);
  };

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
                <input
                  className="admin-input w-full"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">E-mail</label>
                <input
                  className="admin-input w-full"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                />
              </div>
              <button
                onClick={handleProfileSave}
                className={`admin-button-primary transition-all ${profileSaved ? 'bg-accent-green' : ''}`}
              >
                {profileSaved ? <><Check size={11} /> Salvo</> : <><Save size={11} /> Salvar alterações</>}
              </button>
            </div>
          </Card>

          <Card title="Preferências" subtitle="Notificações, tema e idioma">
            <div className="space-y-3">
              {[
                { key: 'email' as const, icon: Bell, label: 'Notificações por e-mail', locked: false },
                { key: 'push' as const, icon: Bell, label: 'Notificações push', locked: false },
                { key: null, icon: Palette, label: 'Tema escuro (admin)', locked: true, on: true },
                { key: null, icon: Globe, label: 'Idioma · Português (BR)', locked: true, on: true },
              ].map((opt, i) => {
                const isOn = opt.key ? notifs[opt.key] : opt.on ?? false;
                return (
                  <div key={i} className="flex items-center justify-between bg-ink-2 border border-line rounded p-3">
                    <div className="flex items-center gap-2.5">
                      <opt.icon size={13} className="text-ink-text-3" />
                      <span className="text-[12px] text-ink-text-1">{opt.label}</span>
                    </div>
                    <button
                      disabled={opt.locked}
                      onClick={() => opt.key && setNotifs((n) => ({ ...n, [opt.key!]: !n[opt.key!] }))}
                      className={`relative w-9 h-5 rounded-full transition-colors ${isOn ? 'bg-accent-blue' : 'bg-ink-4'} ${opt.locked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      aria-checked={isOn}
                      role="switch"
                    >
                      <div
                        className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isOn ? 'translate-x-4' : 'translate-x-0.5'}`}
                      />
                    </button>
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Segurança" subtitle="Senha e acesso">
            <div className="space-y-3">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Senha atual</label>
                <input
                  type="password"
                  className="admin-input w-full"
                  placeholder="••••••••"
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Nova senha</label>
                <input
                  type="password"
                  className="admin-input w-full"
                  placeholder="••••••••"
                  value={passwords.next}
                  onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-ink-text-3 mb-1 block">Confirmar nova senha</label>
                <input
                  type="password"
                  className="admin-input w-full"
                  placeholder="••••••••"
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                />
              </div>
              {passwordMsg && (
                <p className={`text-[11px] ${passwordMsg.type === 'ok' ? 'text-accent-green' : 'text-accent-red'}`}>
                  {passwordMsg.text}
                </p>
              )}
              <button className="admin-button-primary" onClick={handlePasswordUpdate}>
                <Lock size={11} /> Atualizar senha
              </button>
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
