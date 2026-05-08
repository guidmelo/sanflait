// Mock data — substitua por chamadas reais à API quando disponível
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  oldPrice?: number;
  badge?: string;
  description: string;
  images: string[];
  variants: { color: string; size: string; stock: number }[];
}

export interface Vendor {
  id: string;
  slug: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  storeId: string;
  initials: string;
  color: string;
  metrics: { sales: number; revenue: number; conversion: number; leads: number };
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  neighborhood: string;
  age: number;
  gender: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  status: 'LEAD' | 'EM_NEGOCIACAO' | 'CONVERTIDO' | 'PERDIDO';
  source: string;
  vendorId: string;
  createdAt: string;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  vendorId: string;
  vendorName: string;
  storeId?: string;
  storeName?: string;
  amount: number;
  description: string;
  channel: string;
  status: 'CONVERTIDO' | 'EM_NEGOCIACAO' | 'PERDIDO';
  createdAt: string;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  city: string;
  hours: string;
  mapsUrl: string;
  wazeUrl: string;
  description: string;
}

export const products: Product[] = [
  {
    id: 'p1',
    slug: 'vestido-midi-linen-premium',
    name: 'Vestido Midi Linen',
    category: 'Vestidos',
    collection: 'Primavera 2026',
    price: 419,
    oldPrice: 519,
    badge: '-20%',
    description: 'Vestido midi em linho premium, corte fluido e elegante para o dia a dia contemporâneo.',
    images: ['hero-1', 'hero-2', 'hero-3'],
    variants: [
      { color: 'Off-White', size: 'P', stock: 4 },
      { color: 'Off-White', size: 'M', stock: 7 },
      { color: 'Off-White', size: 'G', stock: 2 },
      { color: 'Bege', size: 'M', stock: 5 },
    ],
  },
  {
    id: 'p2',
    slug: 'camisa-oxford-classic',
    name: 'Camisa Oxford Classic',
    category: 'Camisas',
    collection: 'Essenciais',
    price: 349,
    description: 'Camisa em algodão Oxford, gola tradicional, costura impecável.',
    images: ['hero-2'],
    variants: [
      { color: 'Branco', size: 'M', stock: 10 },
      { color: 'Branco', size: 'G', stock: 8 },
      { color: 'Azul claro', size: 'M', stock: 6 },
    ],
  },
  {
    id: 'p3',
    slug: 'blazer-linho-premium',
    name: 'Blazer Linho',
    category: 'Blazers',
    collection: 'Primavera 2026',
    price: 589,
    badge: 'Novo',
    description: 'Blazer em linho italiano, forro de seda, modelagem desestruturada.',
    images: ['hero-3'],
    variants: [
      { color: 'Bege', size: 'P', stock: 3 },
      { color: 'Bege', size: 'M', stock: 5 },
    ],
  },
  {
    id: 'p4',
    slug: 'calca-alfaiataria-fluida',
    name: 'Calça Alfaiataria',
    category: 'Calças',
    collection: 'Essenciais',
    price: 369,
    description: 'Calça de alfaiataria com caimento perfeito e tecido respirável.',
    images: ['hero-1'],
    variants: [{ color: 'Preto', size: '38', stock: 4 }],
  },
  {
    id: 'p5',
    slug: 'blusa-seda-pura',
    name: 'Blusa Seda Pura',
    category: 'Blusas',
    collection: 'Primavera 2026',
    price: 289,
    badge: 'Novo',
    description: 'Blusa em seda pura, toque suave e fluidez impecável.',
    images: ['hero-2'],
    variants: [{ color: 'Marfim', size: 'M', stock: 8 }],
  },
  {
    id: 'p6',
    slug: 'sobretudo-la-virgem',
    name: 'Sobretudo Lã Virgem',
    category: 'Casacos',
    collection: 'Inverno 2026',
    price: 1289,
    description: 'Sobretudo em lã virgem 100%, corte clássico e atemporal.',
    images: ['hero-3'],
    variants: [{ color: 'Camel', size: 'M', stock: 2 }],
  },
];

export const stores: Store[] = [
  {
    id: 's1',
    name: 'Sanflait Centro I',
    address: 'Rua do Imperador, 45 — Centro',
    city: 'Recife, PE',
    hours: 'Segunda a Sábado, 9h às 19h',
    mapsUrl: '#',
    wazeUrl: '#',
    description: 'Nossa primeira unidade, no coração histórico do Recife.',
  },
  {
    id: 's2',
    name: 'Sanflait Centro II',
    address: 'Rua Nova, 120 — Centro',
    city: 'Recife, PE',
    hours: 'Segunda a Sábado, 9h às 19h',
    mapsUrl: '#',
    wazeUrl: '#',
    description: 'Segunda unidade no Centro Histórico — a dois passos do Marco Zero.',
  },
  {
    id: 's3',
    name: 'Sanflait Shopping Boa Vista',
    address: 'Shopping Boa Vista, Piso L2 — Boa Vista',
    city: 'Recife, PE',
    hours: 'Segunda a Sábado, 10h às 22h · Domingo, 14h às 20h',
    mapsUrl: '#',
    wazeUrl: '#',
    description: 'Unidade no Shopping Boa Vista, com estacionamento e praça de alimentação.',
  },
];

export const vendors: Vendor[] = [];

export const customers: Customer[] = [];

export const sales: Sale[] = [];

// Time series for charts
export const monthlyRevenue = [
  { month: 'Jan', value: 0 },
  { month: 'Fev', value: 0 },
  { month: 'Mar', value: 0 },
  { month: 'Abr', value: 0 },
  { month: 'Mai', value: 0 },
];

export const dailyTraffic = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 1}/05`,
  visitors: 180 + Math.round(Math.random() * 240),
  conversions: 8 + Math.round(Math.random() * 24),
}));

export const leadSources = [
  { name: 'WhatsApp', value: 40, color: '#3B82F6' },
  { name: 'Instagram', value: 19, color: '#8B5CF6' },
  { name: 'Link Vendedor', value: 13, color: '#14B8A6' },
  { name: 'Orgânico', value: 8, color: '#F59E0B' },
  { name: 'Indicação', value: 12, color: '#EC4899' },
  { name: 'Outros', value: 8, color: '#6B6B78' },
];
