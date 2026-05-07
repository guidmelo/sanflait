import { useState } from 'react';
import { Calendar, SlidersHorizontal, Download, Bell, Search } from 'lucide-react';
import { useAuth } from '@/stores/auth';

interface TopBarProps {
  title: string;
  subtitle?: string;
  showLive?: boolean;
}

export function AdminTopBar({ title, subtitle, showLive = true }: TopBarProps) {
  const { user } = useAuth();
  const [period, setPeriod] = useState('Maio 2026');

  return (
    <div className="bg-ink-1 border-b border-line h-12 px-4 flex items-center justify-between flex-shrink-0">
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
          onChange={(e) => setPeriod(e.target.value)}
          className="admin-button-ghost cursor-pointer pr-2"
        >
          <option>Hoje</option>
          <option>Últimos 7 dias</option>
          <option>Últimos 15 dias</option>
          <option>Últimos 30 dias</option>
          <option>Maio 2026</option>
          <option>3 meses</option>
          <option>6 meses</option>
          <option>1 ano</option>
        </select>

        <button className="admin-button-ghost">
          <SlidersHorizontal size={12} /> Filtros
        </button>

        <button className="admin-button-primary">
          <Download size={12} /> Exportar
        </button>

        <button className="text-ink-text-3 hover:text-ink-text-1 ml-1 relative" aria-label="Notificações">
          <Bell size={16} strokeWidth={1.5} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-accent-red" />
        </button>

        <div
          className="w-7 h-7 rounded-full ml-1 flex items-center justify-center text-[10px] font-medium text-white"
          style={{ background: user?.avatarColor ?? '#8B5CF6' }}
        >
          {user?.initials ?? '?'}
        </div>
      </div>
    </div>
  );
}
