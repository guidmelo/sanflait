import { Injectable } from '@nestjs/common';
import { Channel, SaleStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  list(filters?: { vendorId?: string; status?: SaleStatus; from?: string; to?: string }) {
    return this.prisma.sale.findMany({
      where: {
        ...(filters?.vendorId && { vendorId: filters.vendorId }),
        ...(filters?.status && { status: filters.status }),
        ...(filters?.from && { createdAt: { gte: new Date(filters.from) } }),
        ...(filters?.to && { createdAt: { lte: new Date(filters.to) } }),
      },
      include: {
        customer: true,
        vendor: { include: { user: true } },
        items: { include: { product: true, variant: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  create(data: {
    customerId: string;
    vendorId: string;
    storeId?: string;
    amount: number;
    description?: string;
    channel?: Channel;
    items?: { productId: string; variantId?: string; quantity: number; unitPrice: number }[];
  }) {
    return this.prisma.sale.create({
      data: {
        customerId: data.customerId,
        vendorId: data.vendorId,
        storeId: data.storeId,
        amount: data.amount,
        description: data.description,
        channel: data.channel ?? Channel.LOJA_FISICA,
        ...(data.items && {
          items: {
            create: data.items,
          },
        }),
      },
      include: { items: true },
    });
  }
}
