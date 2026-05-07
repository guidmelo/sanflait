import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPIProps {
  label: string;
  value: string;
  delta?: number;
  deltaLabel?: string;
  icon: LucideIcon;
  accent: 'blue' | 'purple' | 'teal' | 'amber' | 'red' | 'green' | 'pink';
}

const accentMap = {
  blue: { bar: 'bg-accent-blue', icon: 'text-accent-blue' },
  purple: { bar: 'bg-accent-purple', icon: 'text-accent-purple' },
  teal: { bar: 'bg-accent-teal', icon: 'text-accent-teal' },
  amber: { bar: 'bg-accent-amber', icon: 'text-accent-amber' },
  red: { bar: 'bg-accent-red', icon: 'text-accent-red' },
  green: { bar: 'bg-accent-green', icon: 'text-accent-green' },
  pink: { bar: 'bg-accent-pink', icon: 'text-accent-pink' },
};

export function KPICard({ label, value, delta, deltaLabel, icon: Icon, accent }: KPIProps) {
  const colors = accentMap[accent];
  const isPositive = (delta ?? 0) >= 0;

  return (
    <div className="admin-kpi">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3">{label}</span>
        <Icon size={14} className={colors.icon} strokeWidth={1.75} />
      </div>
      <div className="text-[22px] font-semibold leading-none mb-1.5 text-ink-text-1">
        {value}
      </div>
      {delta !== undefined && (
        <div
          className={cn(
            'text-[11px] flex items-center gap-1',
            isPositive ? 'text-accent-green' : 'text-accent-red',
          )}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          <span>
            {isPositive ? '+' : ''}
            {delta.toFixed(1)}%
          </span>
          {deltaLabel && <span className="text-ink-text-4">{deltaLabel}</span>}
        </div>
      )}
      <div className={cn('absolute bottom-0 left-0 right-0 h-0.5', colors.bar)} />
    </div>
  );
}
