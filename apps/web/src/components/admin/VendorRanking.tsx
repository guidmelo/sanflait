import { vendors } from '@/lib/mock';
import { formatCompact } from '@/lib/utils';

export function VendorRanking() {
  const sorted = [...vendors].sort((a, b) => b.metrics.revenue - a.metrics.revenue);

  if (sorted.length === 0) {
    return (
      <p className="text-[11px] text-ink-text-3 text-center py-6">
        Nenhum vendedor cadastrado ainda.
      </p>
    );
  }

  const max = sorted[0].metrics.revenue || 1;

  return (
    <div>
      {sorted.map((v, i) => {
        const ratio = v.metrics.revenue / max;
        return (
          <div
            key={v.id}
            className="flex items-center gap-2 py-1.5 border-b border-line last:border-b-0 last:pb-0"
          >
            <span
              className="text-[11px] font-semibold w-3.5 text-center flex-shrink-0"
              style={{
                color: i === 0 ? '#F59E0B' : i === 1 ? '#A8A8B3' : i === 2 ? '#6B6B78' : '#4A4A55',
              }}
            >
              {i + 1}
            </span>
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-semibold text-white flex-shrink-0"
              style={{ background: v.color }}
            >
              {v.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-medium text-ink-text-1 truncate">{v.name}</p>
              <div className="w-full h-1 bg-ink-4 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full rounded-full bg-accent-blue"
                  style={{ width: `${ratio * 100}%`, opacity: 0.4 + ratio * 0.6 }}
                />
              </div>
            </div>
            <span className="text-[11px] font-medium text-ink-text-1 flex-shrink-0">
              R$ {formatCompact(v.metrics.revenue)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
