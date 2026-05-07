import { Injectable } from '@nestjs/common';
import { CrmStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CrmService {
  constructor(private prisma: PrismaService) {}

  /** Pipeline / Kanban data — agrupado por status */
  async pipeline() {
    const customers = await this.prisma.customer.findMany({
      include: { vendor: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
    const columns: Record<CrmStatus, typeof customers> = {
      LEAD: [],
      EM_NEGOCIACAO: [],
      CONVERTIDO: [],
      PERDIDO: [],
    };
    for (const c of customers) {
      columns[c.status].push(c);
    }
    return columns;
  }

  addNote(customerId: string, userId: string, description: string) {
    return this.prisma.crmLog.create({
      data: { customerId, userId, action: 'NOTE', description },
    });
  }

  logs(customerId: string) {
    return this.prisma.crmLog.findMany({
      where: { customerId },
      include: { user: { select: { name: true, initials: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }
}
