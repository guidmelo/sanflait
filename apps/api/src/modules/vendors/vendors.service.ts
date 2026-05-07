import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class VendorsService {
  constructor(private prisma: PrismaService) {}

  list() {
    return this.prisma.vendor.findMany({
      include: { user: { select: { name: true, email: true, initials: true, avatarColor: true } }, store: true },
    });
  }

  bySlug(slug: string) {
    return this.prisma.vendor.findUnique({
      where: { slug },
      include: { user: true, store: true },
    });
  }

  async ranking() {
    // Aggregate by vendor: total sales (count) + revenue (sum)
    const grouped = await this.prisma.sale.groupBy({
      by: ['vendorId'],
      where: { status: 'CONVERTIDO' },
      _count: { _all: true },
      _sum: { amount: true },
    });
    const ids = grouped.map((g) => g.vendorId);
    const vendors = await this.prisma.vendor.findMany({
      where: { id: { in: ids } },
      include: { user: true },
    });
    return grouped
      .map((g) => {
        const v = vendors.find((x) => x.id === g.vendorId);
        return {
          vendorId: g.vendorId,
          name: v?.user.name ?? '?',
          slug: v?.slug ?? '',
          sales: g._count._all,
          revenue: Number(g._sum.amount ?? 0),
        };
      })
      .sort((a, b) => b.revenue - a.revenue);
  }
}
