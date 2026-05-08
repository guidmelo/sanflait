import { useState, useRef, useEffect } from 'react';
import { Calendar, SlidersHorizontal, Download, Bell, Search, X, LogOut, User } from 'lucide-react';
import { useAuth } from '@/stores/auth';

interface TopBarProps {
  title: string;
  subtitle?: string;
  showLive?: boolean;
  period?: string;
  onPeriodChange?: (p: string) => void;
  onFiltersClick?: () => void;
  onExport?: () => void;
}

const PERIODS = ['Hoje', 'Últimos 7 dias', 'Últimos 15 dias', 'Últimos 30 dias', 'Maio 2026', '3 meses', '6 meses', '1 ano'];

export function AdminTopBar({
  title,
  subtitle,
  showLive = true,
  period: externalPeriod,
  onPeriodChange,
  onFiltersClick,
  onExport,
}: TopBarProps) {
  const { user, logout } = useAuth();
  const [period, setPeriod] = useState(externalPeriod ?? 'Maio 2026');
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const notifsRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifsRef.current && !notifsRef.current.contains(e.target as Node)) setShowNotifs(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setShowProfile(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handlePeriod = (p: string) => {
    setPeriod(p);
    onPeriodChange?.(p);
  };

  return (
    <div className="bg-ink-1 border-b border-line h-12 px-4 flex items-center justify-between flex-shrink-0 relative z-30">
      <div className="flex items-center gap-3 min-w-0">
        <span className="text-[13px] font-medium text-ink-text-1 truncate">{title}</span>
        {subtitle && <span className="text-[11px] text-ink-text-3 truncate">· {subtitle}</span>}
        {showLive && (
          <span className="admin-pill bg-accent-green-dim text-accent-green flex items-center gap-1 ml-1">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-green animate-pulse" />
            Ao vivo
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden md:flex items-center gap-2 bg-ink-2 border border-line rounded px-2.5 py-1.5">
          <Search size={12} className="text-ink-text-3" />
          <input
            placeholder="Buscar"
            className="bg-transparent text-[12px] outline-none text-ink-text-1 placeholder:text-ink-text-4 w-32"
          />
        </div>

        <select
          value={period}
          onChange={(e) => handlePeriod(e.target.value)}
          className="admin-button-ghost cursor-pointer pr-2"
        >
          {PERIODS.map((p) => <option key={p}>{p}</option>)}
        </select>

        <button
          className="admin-button-ghost"
          onClick={onFiltersClick}
          title="Filtros avançados"
        >
          <SlidersHorizontal size={12} /> Filtros
        </button>

        <button
          className="admin-button-primary"
          onClick={onExport}
          title="Exportar dados"
        >
          <Download size={12} /> Exportar
        </button>

        {/* Notifications */}
        <div ref={notifsRef} className="relative ml-1">
          <button
            className="text-ink-text-3 hover:text-ink-text-1 relative"
            aria-label="Notificações"
            onClick={() => { setShowNotifs((v) => !v); setShowProfile(false); }}
          >
            <Bell size={16} strokeWidth={1.5} />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-red" />
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-8 w-72 bg-ink-2 border border-line rounded-lg shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-line">
                <span className="text-[12px] font-semibold text-ink-text-1">Notificações</span>
                <button onClick={() => setShowNotifs(false)} className="text-ink-text-3 hover:text-ink-text-1">
                  <X size={13} />
                </button>
              </div>
              <div className="p-4 text-center">
                <Bell size={20} className="text-ink-text-4 mx-auto mb-2" strokeWidth={1.25} />
                <p className="text-[11px] text-ink-text-3">Sem notificações novas</p>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative ml-1">
          <button
            className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-medium text-white hover:ring-2 hover:ring-accent-blue/40 transition-all"
            style={{ background: user?.avatarColor ?? '#8B5CF6' }}
            aria-label="Perfil"
            onClick={() => { setShowProfile((v) => !v); setShowNotifs(false); }}
          >
            {user?.initials ?? '?'}
          </button>

          {showProfile && (
            <div className="absolute right-0 top-9 w-52 bg-ink-2 border border-line rounded-lg shadow-2xl overflow-hidden">
              <div className="px-4 py-3 border-b border-line">
                <div className="flex items-center gap-2.5 mb-0.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0"
                    style={{ background: user?.avatarColor ?? '#8B5CF6' }}
                  >
                    {user?.initials ?? '?'}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-ink-text-1 truncate">{user?.name}</p>
                    <p className="text-[10px] text-ink-text-3 truncate">{user?.email}</p>
                  </div>
                </div>
                <span className="admin-pill bg-accent-blue-dim text-accent-blue mt-2">{user?.role}</span>
              </div>
              <div className="p-1.5">
                <button
                  onClick={() => { logout(); setShowProfile(false); }}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded text-[11px] text-accent-red hover:bg-accent-red-dim transition-colors"
                >
                  <LogOut size={12} /> Sair da conta
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
