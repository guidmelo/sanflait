import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  list(params?: { collection?: string; category?: string }) {
    return this.prisma.product.findMany({
      where: {
        active: true,
        ...(params?.collection && { collection: params.collection }),
        ...(params?.category && { category: params.category }),
      },
      include: { variants: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  bySlug(slug: string) {
    return this.prisma.product.findUnique({
      where: { slug },
      include: { variants: { include: { inventories: true } } },
    });
  }
}
