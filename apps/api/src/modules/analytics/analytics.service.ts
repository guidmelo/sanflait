import { Injectable } from '@nestjs/common';
import { CrmStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async dashboard() {
    const [totalRevenue, totalSales, conversionData, vendorCount, customerCount] = await Promise.all([
      this.prisma.sale.aggregate({
        where: { status: 'CONVERTIDO' },
        _sum: { amount: true },
      }),
      this.prisma.sale.count({ where: { status: 'CONVERTIDO' } }),
      this.prisma.customer.groupBy({ by: ['status'], _count: { _all: true } }),
      this.prisma.vendor.count(),
      this.prisma.customer.count(),
    ]);

    const totalCustomers = customerCount;
    const converted = conversionData.find((c) => c.status === CrmStatus.CONVERTIDO)?._count._all ?? 0;
    const conversionRate = totalCustomers > 0 ? (converted / totalCustomers) * 100 : 0;
    const ticketAvg = totalSales > 0 ? Number(totalRevenue._sum.amount ?? 0) / totalSales : 0;

    return {
      revenue: Number(totalRevenue._sum.amount ?? 0),
      sales: totalSales,
      vendors: vendorCount,
      customers: totalCustomers,
      converted,
      conversionRate: Number(conversionRate.toFixed(2)),
      ticketAvg: Number(ticketAvg.toFixed(2)),
    };
  }

  async funnel() {
    const grouped = await this.prisma.customer.groupBy({
      by: ['status'],
      _count: { _all: true },
    });
    return grouped.map((g) => ({ status: g.status, count: g._count._all }));
  }

  async leadSources() {
    const grouped = await this.prisma.customer.groupBy({
      by: ['source'],
      _count: { _all: true },
    });
    return grouped.map((g) => ({ source: g.source ?? 'Desconhecido', count: g._count._all }));
  }

  async monthlyRevenue(year = new Date().getFullYear()) {
    const sales = await this.prisma.sale.findMany({
      where: {
        status: 'CONVERTIDO',
        createdAt: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        },
      },
      select: { amount: true, createdAt: true },
    });

    const months = Array.from({ length: 12 }, (_, i) => ({ month: i + 1, value: 0 }));
    for (const s of sales) {
      const m = s.createdAt.getMonth();
      months[m].value += Number(s.amount);
    }
    return months;
  }
}
