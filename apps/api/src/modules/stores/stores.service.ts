import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class StoresService {
  constructor(private prisma: PrismaService) {}
  list() {
    return this.prisma.store.findMany({
      where: { active: true },
      include: { vendors: { include: { user: true } } },
    });
  }
}
