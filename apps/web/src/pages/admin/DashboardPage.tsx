import { DollarSign, ShoppingBag, LineChart, Target } from 'lucide-react';
import { AdminTopBar } from '@/components/admin/AdminTopBar';
import { KPICard } from '@/components/admin/KPICard';
import { Card } from '@/components/admin/Card';
import { RevenueChart } from '@/components/admin/RevenueChart';
import { LeadSourceDonut } from '@/components/admin/LeadSourceDonut';
import { VendorRanking } from '@/components/admin/VendorRanking';
import { SalesFunnel } from '@/components/admin/SalesFunnel';
import { RecentSales } from '@/components/admin/RecentSales';
import { TrafficChart } from '@/components/admin/TrafficChart';
import { useAuth } from '@/stores/auth';
import { sales, customers } from '@/lib/mock';
import { formatBRL } from '@/lib/utils';

export function DashboardPage() {
  const { user } = useAuth();
  const isVendedor = user?.role === 'VENDEDOR';

  const convertedSales = sales.filter((s) => s.status === 'CONVERTIDO');
  const totalRevenue = convertedSales.reduce((sum, s) => sum + s.amount, 0);
  const totalSalesCount = convertedSales.length;
  const avgTicket = totalSalesCount > 0 ? totalRevenue / totalSalesCount : 0;
  const conversionRate =
    customers.length > 0
      ? (customers.filter((c) => c.status === 'CONVERTIDO').length / customers.length) * 100
      : 0;

  return (
    <>
      <AdminTopBar
        title={isVendedor ? 'Meu Dashboard' : 'Painel Executivo'}
        subtitle="Dados em tempo real"
      />
      <div className="flex-1 overflow-y-auto admin-scroll p-4">
        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mb-3">
          <KPICard
            label={isVendedor ? 'Minha receita' : 'Receita total'}
            value={formatBRL(totalRevenue)}
            icon={DollarSign}
            accent="teal"
          />
          <KPICard
            label={isVendedor ? 'Minhas vendas' : 'Vendas'}
            value={totalSalesCount.toString()}
            icon={ShoppingBag}
            accent="blue"
          />
          <KPICard
            label="Ticket médio"
            value={formatBRL(avgTicket)}
            icon={LineChart}
            accent="purple"
          />
          <KPICard
            label="Conversão"
            value={`${conversionRate.toFixed(1)}%`}
            icon={Target}
            accent="amber"
          />
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-3 gap-2.5 mb-3">
          <Card
            title="Receita Mensal"
            subtitle="Jan – Mai 2026 · Comparativo"
            className="lg:col-span-2"
            action={
              <span className="admin-pill bg-accent-blue-dim text-accent-blue">2026</span>
            }
          >
            <RevenueChart />
          </Card>
          <Card title="Origem dos Leads" subtitle="Por canal de aquisição">
            <LeadSourceDonut />
          </Card>
        </div>

        {/* Traffic */}
        <div className="mb-3">
          <Card title="Tráfego e Conversões" subtitle="Últimos 14 dias">
            <TrafficChart />
            <div className="flex items-center gap-5 mt-2 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-blue" />
                <span className="text-ink-text-2">Visitantes</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent-teal" />
                <span className="text-ink-text-2">Conversões</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Bottom row */}
        <div className="grid lg:grid-cols-3 gap-2.5">
          <Card title="Ranking de Vendedores" subtitle="Por receita · mai/2026">
            <VendorRanking />
          </Card>
          <Card title="Funil de Vendas" subtitle="Conversão por etapa">
            <SalesFunnel />
          </Card>
          <Card title="Vendas Recentes" subtitle="Últimas transações">
            <RecentSales />
          </Card>
        </div>
      </div>
    </>
  );
}
