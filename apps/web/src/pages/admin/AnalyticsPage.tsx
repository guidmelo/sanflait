import { TrendingUp, Users, MousePointerClick, Target } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { Card } from '@/components/admin/Card';
import { KPICard } from '@/components/admin/KPICard';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { TrafficChart } from '@/components/admin/TrafficChart';
import { LeadSourceDonut } from '@/components/admin/LeadSourceDonut';
import { SalesFunnel } from '@/components/admin/SalesFunnel';
import { cn } from '@/lib/utils';

const NEIGHBORHOODS = [
  { name: 'Centro', value: 38, color: '#3B82F6' },
  { name: 'Tancredo Neves', value: 24, color: '#8B5CF6' },
  { name: 'Vila Matias', value: 18, color: '#14B8A6' },
  { name: 'BTN', value: 12, color: '#F59E0B' },
  { name: 'Outros', value: 8, color: '#6B6B78' },
];

const AGE_DEMO = [
  { range: '18-24', value: 14 },
  { range: '25-34', value: 38 },
  { range: '35-44', value: 28 },
  { range: '45-54', value: 14 },
  { range: '55+', value: 6 },
];

export function AnalyticsPage() {
  return (
    <>
      <AdminTopBar title="Analytics & BI" subtitle="Inteligência comercial" />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
          <KPICard label="Visitantes únicos" value="4.180" delta={22.4} deltaLabel="vs mês anterior" icon={Users} accent="blue" />
          <KPICard label="Taxa de cliques" value="14,8%" delta={3.1} deltaLabel="vs mês anterior" icon={MousePointerClick} accent="purple" />
          <KPICard label="Leads gerados" value="1.240" delta={18.7} deltaLabel="vs mês anterior" icon={Target} accent="teal" />
          <KPICard label="ROI atribuído" value="412%" delta={28.0} deltaLabel="vs mês anterior" icon={TrendingUp} accent="green" />
        </div>

        <div className="grid lg:grid-cols-2 gap-2.5 mb-3">
          <Card title="Receita Mensal" subtitle="Tendência ao longo do ano">
            <RevenueChart />
          </Card>
          <Card title="Tráfego e Conversões" subtitle="Últimos 14 dias">
            <TrafficChart />
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-2.5 mb-3">
          <Card title="Funil de conversão" subtitle="Etapas do pipeline">
            <SalesFunnel />
          </Card>
          <Card title="Origem dos leads" subtitle="Atribuição last-click">
            <LeadSourceDonut />
          </Card>
          <Card title="Distribuição por bairro" subtitle="Concentração geográfica">
            <div className="space-y-2">
              {NEIGHBORHOODS.map((n) => (
                <div key={n.name}>
                  <div className="flex justify-between text-[10px] mb-1">
                    <span className="text-ink-text-2">{n.name}</span>
                    <span className="text-ink-text-1 font-medium">{n.value}%</span>
                  </div>
                  <div className="h-1.5 bg-ink-3 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${n.value * 2}%`, background: n.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-2.5">
          <Card title="Demografia · Idade" subtitle="Faixa etária dos clientes">
            <div className="flex items-end justify-around h-32 gap-2 mt-4">
              {AGE_DEMO.map((a, i) => (
                <div key={a.range} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t"
                    style={{
                      height: `${a.value * 2.4}px`,
                      background: ['#3B82F6', '#8B5CF6', '#14B8A6', '#F59E0B', '#EC4899'][i],
                      opacity: 0.85,
                    }}
                  />
                  <p className="text-[10px] text-ink-text-2">{a.range}</p>
                  <p className="text-[10px] font-medium text-ink-text-1">{a.value}%</p>
                </div>
              ))}
            </div>
          </Card>
          <Card title="Insights automáticos" subtitle="Detectados pela IA">
            <div className="space-y-2.5">
              {[
                { type: 'success', msg: 'Vendas em Maio +18% vs Abril — manter campanhas ativas' },
                { type: 'warning', msg: 'Taxa de conversão caiu 1,2% — revisar follow-up de leads' },
                { type: 'info', msg: 'Centro responde por 38% das vendas — ampliar veiculação local' },
                { type: 'success', msg: 'WhatsApp gera 40% dos leads convertidos — canal prioritário' },
              ].map((ins, i) => (
                <div
                  key={i}
                  className={cn(
                    'border-l-2 pl-3 py-2 text-[11px] text-ink-text-2 leading-relaxed',
                    ins.type === 'success' && 'border-accent-green',
                    ins.type === 'warning' && 'border-accent-amber',
                    ins.type === 'info' && 'border-accent-blue',
                  )}
                >
                  {ins.msg}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}
