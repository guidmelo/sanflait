import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .trim();
}

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

  async bySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: { variants: { include: { inventories: true } } },
    });
    if (!product) throw new NotFoundException(`Produto '${slug}' não encontrado`);
    return product;
  }

  async create(dto: CreateProductDto) {
    const slug = dto.slug ?? slugify(dto.name);
    // Ensure unique slug
    const existing = await this.prisma.product.findUnique({ where: { slug } });
    const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

    return this.prisma.product.create({
      data: {
        name: dto.name,
        slug: finalSlug,
        category: dto.category,
        collection: dto.collection,
        description: dto.description,
        basePrice: dto.basePrice,
        oldPrice: dto.oldPrice,
        badge: dto.badge,
        images: dto.images ?? [],
        active: dto.active ?? true,
      },
      include: { variants: true },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    await this.prisma.product.findUniqueOrThrow({ where: { id } });
    return this.prisma.product.update({
      where: { id },
      data: {
        ...(dto.name !== undefined && { name: dto.name }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.collection !== undefined && { collection: dto.collection }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.basePrice !== undefined && { basePrice: dto.basePrice }),
        ...(dto.oldPrice !== undefined && { oldPrice: dto.oldPrice }),
        ...(dto.badge !== undefined && { badge: dto.badge }),
        ...(dto.images !== undefined && { images: dto.images }),
        ...(dto.active !== undefined && { active: dto.active }),
      },
      include: { variants: true },
    });
  }

  async remove(id: string) {
    await this.prisma.product.findUniqueOrThrow({ where: { id } });
    return this.prisma.product.delete({ where: { id } });
  }
}
