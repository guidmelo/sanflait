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
    name: 'Sanflait Centro',
    address: 'Rua Principal, 120 — Centro',
    city: 'Paulo Afonso, BA',
    hours: 'Seg–Sáb 9h–19h',
    mapsUrl: '#',
    wazeUrl: '#',
    description: 'Nossa loja principal no coração de Paulo Afonso.',
  },
  {
    id: 's2',
    name: 'Sanflait Mall',
    address: 'Shopping Avenida, Loja 42',
    city: 'Paulo Afonso, BA',
    hours: 'Diário 10h–22h',
    mapsUrl: '#',
    wazeUrl: '#',
    description: 'Atendimento estendido todos os dias da semana.',
  },
];

export const vendors: Vendor[] = [
  {
    id: 'v1',
    slug: 'guilherme-melo',
    name: 'Guilherme Melo',
    email: 'guilherme@sanflait.com',
    phone: '(75) 99000-0001',
    avatar: 'GM',
    storeId: 's1',
    initials: 'GM',
    color: '#8B5CF6',
    metrics: { sales: 92, revenue: 22400, conversion: 11.4, leads: 240 },
  },
  {
    id: 'v2',
    slug: 'ana-silva',
    name: 'Ana Silva',
    email: 'ana@sanflait.com',
    phone: '(75) 99000-0002',
    avatar: 'AS',
    storeId: 's1',
    initials: 'AS',
    color: '#14B8A6',
    metrics: { sales: 74, revenue: 18100, conversion: 9.8, leads: 195 },
  },
  {
    id: 'v3',
    slug: 'carlos-rocha',
    name: 'Carlos Rocha',
    email: 'carlos@sanflait.com',
    phone: '(75) 99000-0003',
    avatar: 'CR',
    storeId: 's2',
    initials: 'CR',
    color: '#F59E0B',
    metrics: { sales: 60, revenue: 14600, conversion: 8.1, leads: 168 },
  },
  {
    id: 'v4',
    slug: 'mariana-fontes',
    name: 'Mariana Fontes',
    email: 'mariana@sanflait.com',
    phone: '(75) 99000-0004',
    avatar: 'MF',
    storeId: 's2',
    initials: 'MF',
    color: '#3B82F6',
    metrics: { sales: 46, revenue: 11100, conversion: 7.2, leads: 142 },
  },
];

export const customers: Customer[] = [
  { id: 'c1', name: 'Juliana Andrade', phone: '(75) 98800-1010', email: 'juliana@email.com', neighborhood: 'Centro', age: 32, gender: 'FEMININO', status: 'CONVERTIDO', source: 'WhatsApp', vendorId: 'v1', createdAt: '2026-05-04T14:30:00Z' },
  { id: 'c2', name: 'Pedro Costa', phone: '(75) 98800-1011', email: 'pedro@email.com', neighborhood: 'Tancredo', age: 41, gender: 'MASCULINO', status: 'EM_NEGOCIACAO', source: 'Instagram', vendorId: 'v2', createdAt: '2026-05-05T10:12:00Z' },
  { id: 'c3', name: 'Beatriz Lima', phone: '(75) 98800-1012', email: 'beatriz@email.com', neighborhood: 'Vila Matias', age: 28, gender: 'FEMININO', status: 'LEAD', source: 'Link Vendedor', vendorId: 'v1', createdAt: '2026-05-05T15:00:00Z' },
  { id: 'c4', name: 'Ricardo Souza', phone: '(75) 98800-1013', email: 'ricardo@email.com', neighborhood: 'Centro', age: 35, gender: 'MASCULINO', status: 'CONVERTIDO', source: 'Orgânico', vendorId: 'v3', createdAt: '2026-05-03T09:20:00Z' },
  { id: 'c5', name: 'Fernanda Cruz', phone: '(75) 98800-1014', email: 'fernanda@email.com', neighborhood: 'BTN', age: 39, gender: 'FEMININO', status: 'PERDIDO', source: 'WhatsApp', vendorId: 'v4', createdAt: '2026-05-02T17:45:00Z' },
  { id: 'c6', name: 'Lucas Vieira', phone: '(75) 98800-1015', email: 'lucas@email.com', neighborhood: 'Tancredo', age: 26, gender: 'MASCULINO', status: 'EM_NEGOCIACAO', source: 'Instagram', vendorId: 'v2', createdAt: '2026-05-05T18:30:00Z' },
  { id: 'c7', name: 'Camila Pinto', phone: '(75) 98800-1016', email: 'camila@email.com', neighborhood: 'Vila Matias', age: 31, gender: 'FEMININO', status: 'LEAD', source: 'WhatsApp', vendorId: 'v1', createdAt: '2026-05-06T08:10:00Z' },
  { id: 'c8', name: 'Marcos Aurélio', phone: '(75) 98800-1017', email: 'marcos@email.com', neighborhood: 'Centro', age: 45, gender: 'MASCULINO', status: 'CONVERTIDO', source: 'Link Vendedor', vendorId: 'v3', createdAt: '2026-05-04T11:00:00Z' },
];

export const sales: Sale[] = [
  { id: 'sale1', customerId: 'c1', customerName: 'Juliana Andrade', vendorId: 'v1', vendorName: 'Guilherme Melo', amount: 419, description: 'Vestido Midi Linen', channel: 'WhatsApp', status: 'CONVERTIDO', createdAt: '2026-05-04T15:00:00Z' },
  { id: 'sale2', customerId: 'c4', customerName: 'Ricardo Souza', vendorId: 'v3', vendorName: 'Carlos Rocha', amount: 890, description: 'Kit 3 Peças Casual', channel: 'Loja Física', status: 'CONVERTIDO', createdAt: '2026-05-03T11:00:00Z' },
  { id: 'sale3', customerId: 'c2', customerName: 'Pedro Costa', vendorId: 'v2', vendorName: 'Ana Silva', amount: 589, description: 'Blazer Premium', channel: 'WhatsApp', status: 'EM_NEGOCIACAO', createdAt: '2026-05-05T10:30:00Z' },
  { id: 'sale4', customerId: 'c8', customerName: 'Marcos Aurélio', vendorId: 'v3', vendorName: 'Carlos Rocha', amount: 1289, description: 'Sobretudo Lã Virgem', channel: 'Link Vendedor', status: 'CONVERTIDO', createdAt: '2026-05-04T13:00:00Z' },
  { id: 'sale5', customerId: 'c5', customerName: 'Fernanda Cruz', vendorId: 'v4', vendorName: 'Mariana Fontes', amount: 369, description: 'Calça Alfaiataria', channel: 'WhatsApp', status: 'PERDIDO', createdAt: '2026-05-02T18:00:00Z' },
  { id: 'sale6', customerId: 'c1', customerName: 'Juliana Andrade', vendorId: 'v1', vendorName: 'Guilherme Melo', amount: 289, description: 'Blusa Seda Pura', channel: 'Loja Física', status: 'CONVERTIDO', createdAt: '2026-05-06T09:00:00Z' },
];

// Time series for charts
export const monthlyRevenue = [
  { month: 'Jan', value: 52000 },
  { month: 'Fev', value: 61000 },
  { month: 'Mar', value: 58000 },
  { month: 'Abr', value: 73000 },
  { month: 'Mai', value: 84200 },
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
