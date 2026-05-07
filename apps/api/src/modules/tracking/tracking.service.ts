import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { EventType } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TrackingService {
  constructor(private prisma: PrismaService) {}

  /**
   * Cria/atualiza uma sessão de tráfego.
   * Last-click attribution: o vendor mais recente associado ganha a atribuição.
   */
  async upsertSession(input: {
    sessionToken?: string;
    vendorSlug?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    referrer?: string;
    landingPage?: string;
    userAgent?: string;
    ipHash?: string;
  }) {
    const token = input.sessionToken ?? uuid();

    let vendorId: string | undefined;
    if (input.vendorSlug) {
      const vendor = await this.prisma.vendor.findUnique({
        where: { slug: input.vendorSlug },
      });
      vendorId = vendor?.id;
    }

    const existing = await this.prisma.trafficSession.findUnique({
      where: { sessionToken: token },
    });

    if (existing) {
      // Last-click: atualiza vendor se um novo veio
      return this.prisma.trafficSession.update({
        where: { sessionToken: token },
        data: {
          ...(vendorId && { vendorId }),
          ...(input.utmSource && { utmSource: input.utmSource }),
          ...(input.utmMedium && { utmMedium: input.utmMedium }),
          ...(input.utmCampaign && { utmCampaign: input.utmCampaign }),
          lastSeenAt: new Date(),
        },
      });
    }

    return this.prisma.trafficSession.create({
      data: {
        sessionToken: token,
        vendorId,
        utmSource: input.utmSource,
        utmMedium: input.utmMedium,
        utmCampaign: input.utmCampaign,
        referrer: input.referrer,
        landingPage: input.landingPage,
        userAgent: input.userAgent,
        ipHash: input.ipHash,
      },
    });
  }

  async logEvent(input: {
    sessionToken: string;
    type: EventType;
    productId?: string;
    metadata?: any;
  }) {
    const session = await this.prisma.trafficSession.findUnique({
      where: { sessionToken: input.sessionToken },
    });
    if (!session) throw new Error('Session not found');
    return this.prisma.trafficEvent.create({
      data: {
        sessionId: session.id,
        type: input.type,
        productId: input.productId,
        metadata: input.metadata,
      },
    });
  }
}
