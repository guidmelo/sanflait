import { PrismaClient, Role, CrmStatus, SaleStatus, Channel, Gender } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Stores
  const store1 = await prisma.store.upsert({
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
  const store2 = await prisma.store.upsert({
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

  // Users
  const adminPwd = await argon2.hash('admin');
  const admin = await prisma.user.upsert({
    where: { email: 'admin@sanflait.com' },
    update: {},
    create: {
      name: 'Camila Sanflait',
      email: 'admin@sanflait.com',
      passwordHash: adminPwd,
      role: Role.ADMIN,
      initials: 'CS',
      avatarColor: '#8B5CF6',
    },
  });

  const gerentePwd = await argon2.hash('gerente');
  await prisma.user.upsert({
    where: { email: 'gerente@sanflait.com' },
    update: {},
    create: {
      name: 'Rafael Costa',
      email: 'gerente@sanflait.com',
      passwordHash: gerentePwd,
      role: Role.GERENTE,
      initials: 'RC',
      avatarColor: '#14B8A6',
      storeId: store1.id,
    },
  });

  // Vendor user + vendor
  const vendorPwd = await argon2.hash('vendedor');
  const vendorUser = await prisma.user.upsert({
    where: { email: 'guilherme@sanflait.com' },
    update: {},
    create: {
      name: 'Guilherme Melo',
      email: 'guilherme@sanflait.com',
      passwordHash: vendorPwd,
      role: Role.VENDEDOR,
      initials: 'GM',
      avatarColor: '#3B82F6',
      storeId: store1.id,
    },
  });

  await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: {},
    create: {
      slug: 'guilherme-melo',
      userId: vendorUser.id,
      storeId: store1.id,
      phone: '(75) 99000-0001',
      bio: 'Atendimento especializado em moda contemporânea.',
    },
  });

  // Products + variants
  const p1 = await prisma.product.upsert({
    where: { slug: 'vestido-midi-linen-premium' },
    update: {},
    create: {
      slug: 'vestido-midi-linen-premium',
      name: 'Vestido Midi Linen',
      category: 'Vestidos',
      collection: 'Primavera 2026',
      basePrice: 419,
      oldPrice: 519,
      badge: '-20%',
      description: 'Vestido midi em linho premium, corte fluido e elegante.',
      variants: {
        create: [
          { sku: 'VM-OFF-P', color: 'Off-White', size: 'P' },
          { sku: 'VM-OFF-M', color: 'Off-White', size: 'M' },
          { sku: 'VM-OFF-G', color: 'Off-White', size: 'G' },
          { sku: 'VM-BEG-M', color: 'Bege', size: 'M' },
        ],
      },
    },
    include: { variants: true },
  });

  // Inventory
  for (const v of p1.variants) {
    await prisma.inventory.upsert({
      where: { storeId_variantId: { storeId: store1.id, variantId: v.id } },
      update: {},
      create: { storeId: store1.id, variantId: v.id, quantity: 5 },
    });
  }

  // Customer + sale
  const cust = await prisma.customer.create({
    data: {
      name: 'Juliana Andrade',
      phone: '(75) 98800-1010',
      email: 'juliana@email.com',
      neighborhood: 'Centro',
      age: 32,
      gender: Gender.FEMININO,
      status: CrmStatus.CONVERTIDO,
      source: 'WhatsApp',
    },
  });

  const vendor = await prisma.vendor.findUnique({ where: { userId: vendorUser.id } });
  if (vendor) {
    await prisma.sale.create({
      data: {
        customerId: cust.id,
        vendorId: vendor.id,
        storeId: store1.id,
        amount: 419,
        description: 'Vestido Midi Linen — Off-White, M',
        channel: Channel.WHATSAPP,
        status: SaleStatus.CONVERTIDO,
      },
    });
  }

  console.log('✅ Seed completed');
  console.log('Demo logins:');
  console.log('  admin@sanflait.com / admin');
  console.log('  gerente@sanflait.com / gerente');
  console.log('  guilherme@sanflait.com / vendedor');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
