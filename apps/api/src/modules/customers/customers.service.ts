import { Injectable } from '@nestjs/common';
import { CrmStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CustomersService {
  constructor(private prisma: PrismaService) {}

  list(filters?: { status?: CrmStatus; vendorId?: string; neighborhood?: string }) {
    return this.prisma.customer.findMany({
      where: {
        ...(filters?.status && { status: filters.status }),
        ...(filters?.vendorId && { vendorId: filters.vendorId }),
        ...(filters?.neighborhood && { neighborhood: filters.neighborhood }),
      },
      include: { vendor: { include: { user: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  byId(id: string) {
    return this.prisma.customer.findUnique({
      where: { id },
      include: {
        vendor: { include: { user: true } },
        sales: true,
        crmLogs: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  create(data: any) {
    return this.prisma.customer.create({ data });
  }

  updateStatus(id: string, status: CrmStatus, userId: string) {
    return this.prisma.$transaction(async (tx) => {
      const old = await tx.customer.findUnique({ where: { id } });
      if (!old) throw new Error('Cliente não encontrado');
      const updated = await tx.customer.update({ where: { id }, data: { status } });
      await tx.crmLog.create({
        data: {
          customerId: id,
          userId,
          action: 'STATUS_CHANGE',
          oldStatus: old.status,
          newStatus: status,
        },
      });
      return updated;
    });
  }
}
