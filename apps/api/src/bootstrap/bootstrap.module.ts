import { Module, Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as argon2 from 'argon2';
import { Role } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BootstrapService implements OnApplicationBootstrap {
  private readonly log = new Logger(BootstrapService.name);

  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const adminCount = await this.prisma.user.count({ where: { role: Role.ADMIN } });
    if (adminCount > 0) return;

    this.log.log('No admin found — running first-time bootstrap...');

    const email = this.config.get('BOOTSTRAP_ADMIN_EMAIL') ?? 'admin@sanflait.com';
    const password = this.config.get('BOOTSTRAP_ADMIN_PASSWORD') ?? 'Admin@2026';

    const store = await this.prisma.store.upsert({
      where: { id: '11111111-1111-1111-1111-111111111111' },
      update: {},
      create: {
        id: '11111111-1111-1111-1111-111111111111',
        name: 'Sanflait Centro',
        address: 'Rua Principal, 120 — Centro',
        city: 'Paulo Afonso, BA',
        hours: 'Seg–Sáb 9h–19h',
        description: 'Nossa loja principal no coração de Paulo Afonso.',
      },
    });

    const storeId = store.id;

    await this.prisma.store.upsert({
      where: { id: '22222222-2222-2222-2222-222222222222' },
      update: {},
      create: {
        id: '22222222-2222-2222-2222-222222222222',
        name: 'Sanflait Mall',
        address: 'Shopping Avenida, Loja 42',
        city: 'Paulo Afonso, BA',
        hours: 'Diário 10h–22h',
        description: 'Atendimento estendido todos os dias da semana.',
      },
    });

    await this.prisma.user.create({
      data: {
        name: 'Administrador',
        email,
        passwordHash: await argon2.hash(password),
        role: Role.ADMIN,
        initials: 'AD',
        avatarColor: '#8B5CF6',
      },
    });

    const gerenteUser = await this.prisma.user.create({
      data: {
        name: 'Rafael Costa',
        email: 'gerente@sanflait.com',
        passwordHash: await argon2.hash('Gerente@2026'),
        role: Role.GERENTE,
        initials: 'RC',
        avatarColor: '#14B8A6',
        storeId,
      },
    });

    const vendorUser = await this.prisma.user.create({
      data: {
        name: 'Guilherme Melo',
        email: 'guilherme@sanflait.com',
        passwordHash: await argon2.hash('Vendedor@2026'),
        role: Role.VENDEDOR,
        initials: 'GM',
        avatarColor: '#3B82F6',
        storeId,
      },
    });

    await this.prisma.vendor.create({
      data: {
        slug: 'guilherme-melo',
        userId: vendorUser.id,
        storeId,
        phone: '(75) 99000-0001',
        bio: 'Atendimento especializado em moda contemporânea.',
      },
    });

    this.log.log(`✅ Bootstrap complete`);
    this.log.log(`   Admin: ${email} / ${password}`);
    this.log.log(`   Gerente: gerente@sanflait.com / Gerente@2026`);
    this.log.log(`   Vendedor: guilherme@sanflait.com / Vendedor@2026`);
    this.log.warn(`   ⚠️  Change passwords via Settings after first login!`);
  }
}

@Module({
  providers: [BootstrapService],
})
export class BootstrapModule {}
