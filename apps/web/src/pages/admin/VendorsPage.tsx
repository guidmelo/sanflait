import { Plus, Copy, ExternalLink, Trophy } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { vendors } from '@/lib/mock';
import { cn, formatBRL, formatPct } from '@/lib/utils';

export function VendorsPage() {
  const sorted = [...vendors].sort((a, b) => b.metrics.revenue - a.metrics.revenue);
  const handleCopy = (slug: string) => {
    navigator.clipboard.writeText(`https://sanflait.com/r/${slug}`);
  };

  return (
    <>
      <AdminTopBar title="Vendedores" subtitle={`${vendors.length} ativos`} showLive={false} />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-4 gap-2.5 mb-3">
          {[
            { label: 'Total ativos', value: vendors.length.toString(), accent: 'border-accent-blue' },
            { label: 'Vendas (mês)', value: vendors.reduce((s, v) => s + v.metrics.sales, 0).toString(), accent: 'border-accent-green' },
            { label: 'Receita (mês)', value: formatBRL(vendors.reduce((s, v) => s + v.metrics.revenue, 0)), accent: 'border-accent-teal' },
            { label: 'Conversão média', value: '9,1%', accent: 'border-accent-purple' },
          ].map((k) => (
            <div key={k.label} className={cn('admin-card p-3 border-l-2 rounded-l-none', k.accent)}>
              <p className="text-[10px] uppercase tracking-[0.05em] text-ink-text-3 mb-1">{k.label}</p>
              <p className="text-[18px] font-semibold text-ink-text-1">{k.value}</p>
            </div>
          ))}
        </div>

        <Card
          title="Lista de vendedores"
          subtitle="Cada um possui um link único de rastreio (last-click attribution)"
          action={<button className="admin-button-primary"><Plus size={11} /> Novo vendedor</button>}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {sorted.map((v, i) => (
              <div key={v.id} className="bg-ink-2 border border-line rounded p-4 hover:border-line-strong transition-colors">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full text-white text-[14px] font-semibold flex items-center justify-center flex-shrink-0" style={{ background: v.color }}>
                    {v.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[14px] font-medium text-ink-text-1">{v.name}</p>
                      {i < 3 && (
                        <Trophy
                          size={12}
                          className={i === 0 ? 'text-accent-amber' : i === 1 ? 'text-ink-text-2' : 'text-ink-text-3'}
                        />
                      )}
                    </div>
                    <p className="text-[10px] text-ink-text-3">{v.email}</p>
                    <p className="text-[10px] text-ink-text-3">{v.phone}</p>
                  </div>
                  <span className="admin-pill bg-accent-blue-dim text-accent-blue">#{i + 1}</span>
                </div>

                <div className="grid grid-cols-4 gap-2 mb-4">
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Vendas</p>
                    <p className="text-[13px] font-semibold text-ink-text-1">{v.metrics.sales}</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Receita</p>
                    <p className="text-[13px] font-semibold text-accent-teal">R$ {(v.metrics.revenue / 1000).toFixed(1)}K</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Conv.</p>
                    <p className="text-[13px] font-semibold text-accent-amber">{formatPct(v.metrics.conversion)}</p>
                  </div>
                  <div className="bg-ink-3 rounded p-2">
                    <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-0.5">Leads</p>
                    <p className="text-[13px] font-semibold text-ink-text-1">{v.metrics.leads}</p>
                  </div>
                </div>

                <div className="bg-ink-3 border border-line rounded p-2.5">
                  <p className="text-[9px] uppercase tracking-wider text-ink-text-3 mb-1.5">Link único de rastreio</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-[10px] text-accent-blue truncate">
                      sanflait.com/r/{v.slug}
                    </code>
                    <button
                      onClick={() => handleCopy(v.slug)}
                      className="text-ink-text-3 hover:text-ink-text-1 flex-shrink-0"
                      aria-label="Copiar"
                    >
                      <Copy size={11} />
                    </button>
                    <a
                      href={`/r/${v.slug}`}
                      target="_blank"
                      rel="noopener"
                      className="text-ink-text-3 hover:text-ink-text-1 flex-shrink-0"
                      aria-label="Abrir"
                    >
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}
