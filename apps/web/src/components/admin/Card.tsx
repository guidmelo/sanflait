import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CardProps {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, subtitle, action, children, className }: CardProps) {
  return (
    <div className={cn('admin-card p-4', className)}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-[12px] font-medium text-ink-text-1">{title}</h3>
          {subtitle && <p className="text-[10px] text-ink-text-3 mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button className="text-ink-text-3 hover:text-ink-text-1" aria-label="Mais opções">
            <MoreHorizontal size={14} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
