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

// ─── CATÁLOGO SANFLAIT ───────────────────────────────────────────────────────

export const products: Product[] = [
  // ── CAMISAS ──────────────────────────────────────────────────────────────
  {
    id: 'c01',
    slug: 'camisa-polo-masculina',
    name: 'Camisa Polo Masculina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 99.90,
    description: 'Polo masculina confeccionada com tecido de alta qualidade e excelente acabamento. Ideal para quem busca elegância e versatilidade no dia a dia, do casual ao semi-formal.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Preto', size: 'G', stock: 0 },
    ],
  },
  {
    id: 'c02',
    slug: 'camisa-polo-feminina',
    name: 'Camisa Polo Feminina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 99.90,
    description: 'Polo feminina com modelagem estruturada e tecido respirável. Combina praticidade e sofisticação para o cotidiano moderno.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c03',
    slug: 'camisa-basica-masculina',
    name: 'Camisa Básica Masculina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 79.90,
    description: 'Camisa básica masculina de corte reto e caimento limpo. Peça coringa para composições do dia a dia, com conforto e durabilidade garantidos.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Cinza', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c04',
    slug: 'camisa-basica-feminina',
    name: 'Camisa Básica Feminina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 79.90,
    description: 'Camisa básica feminina com modelagem versátil e tecido macio. Essencial no guarda-roupa de quem valoriza simplicidade com estilo.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c05',
    slug: 'camisa-social-masculina',
    name: 'Camisa Social Masculina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 129.90,
    description: 'Camisa social masculina com corte tradicional e tecido de alta qualidade. Acabamento refinado e costura impecável, ideal para o ambiente corporativo e ocasiões formais.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Azul claro', size: 'M', stock: 0 },
      { color: 'Azul claro', size: 'G', stock: 0 },
    ],
  },
  {
    id: 'c06',
    slug: 'camisa-manga-longa-masculina',
    name: 'Camisa Manga Longa Masculina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 109.90,
    description: 'Manga longa masculina com tecido leve e modelagem confortável. Versátil para diversas ocasiões, do casual ao passeio, com um toque de sofisticação.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c07',
    slug: 'camisa-manga-longa-social-masculina',
    name: 'Camisa Manga Longa Social Masculina',
    category: 'Camisas',
    collection: 'Camisas',
    price: 139.90,
    description: 'Social de manga longa com tecido premium e caimento preciso. Destinada a quem exige presença e elegância em reuniões, eventos e ambientes corporativos.',
    images: [],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Azul claro', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c08',
    slug: 'camisa-tecido-botao',
    name: 'Camisa Tecido de Botão',
    category: 'Camisas',
    collection: 'Camisas',
    price: 119.90,
    description: 'Camisa de tecido com abotoamento frontal e modelagem clean. Peça que equilibra despojamento e elegância, perfeita para composições variadas.',
    images: [],
    variants: [
      { color: 'Bege', size: 'P', stock: 0 },
      { color: 'Bege', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c09',
    slug: 'camisa-trabalhada',
    name: 'Camisa Trabalhada',
    category: 'Camisas',
    collection: 'Camisas',
    price: 129.90,
    badge: 'Destaque',
    description: 'Camisa com detalhes trabalhados e textura diferenciada. Para quem busca destaque nas composições sem abrir mão do refinamento.',
    images: [],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c10',
    slug: 'camisa-canelada',
    name: 'Camisa Canelada',
    category: 'Camisas',
    collection: 'Camisas',
    price: 89.90,
    description: 'Camisa em tecido canelado com textura marcante e toque agradável. Visual contemporâneo e confortável para o cotidiano.',
    images: [],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Cinza', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'c11',
    slug: 'camisa-xadrez',
    name: 'Camisa Xadrez',
    category: 'Camisas',
    collection: 'Camisas',
    price: 99.90,
    description: 'Camisa xadrez clássica com estampa equilibrada e tecido de boa durabilidade. Versatilidade garantida nas composições casuais e passeio.',
    images: [],
    variants: [
      { color: 'Azul/Branco', size: 'P', stock: 0 },
      { color: 'Azul/Branco', size: 'M', stock: 0 },
      { color: 'Vermelho/Preto', size: 'M', stock: 0 },
    ],
  },

  // ── CALÇAS ────────────────────────────────────────────────────────────────
  {
    id: 'ca01',
    slug: 'calca-sarja',
    name: 'Calça Sarja',
    category: 'Calças',
    collection: 'Calças',
    price: 119.90,
    description: 'Calça em sarja com corte reto e caimento confortável. Durabilidade e praticidade para o dia a dia, com visual limpo e versátil.',
    images: [],
    variants: [
      { color: 'Areia', size: '38', stock: 0 },
      { color: 'Areia', size: '40', stock: 0 },
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
    ],
  },
  {
    id: 'ca02',
    slug: 'calca-jeans',
    name: 'Calça Jeans',
    category: 'Calças',
    collection: 'Calças',
    price: 129.90,
    description: 'Calça jeans de corte reto com tecido de qualidade e ótimo caimento. Clássico indispensável para composições casuais e passeio.',
    images: [],
    variants: [
      { color: 'Azul médio', size: '38', stock: 0 },
      { color: 'Azul médio', size: '40', stock: 0 },
      { color: 'Azul escuro', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
    ],
  },
  {
    id: 'ca03',
    slug: 'calca-social',
    name: 'Calça Social',
    category: 'Calças',
    collection: 'Calças',
    price: 149.90,
    description: 'Calça social com tecido refinado e modelagem precisa. Indicada para ambientes corporativos e ocasiões que exigem apresentação impecável.',
    images: [],
    variants: [
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
      { color: 'Marinho', size: '38', stock: 0 },
      { color: 'Marinho', size: '40', stock: 0 },
    ],
  },

  // ── BERMUDAS ──────────────────────────────────────────────────────────────
  {
    id: 'b01',
    slug: 'bermuda-tactel',
    name: 'Bermuda Tactel',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 69.90,
    description: 'Bermuda em tactel leve e de secagem rápida. Perfeita para o calor do Nordeste, com conforto total para o dia a dia e momentos de lazer.',
    images: [],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Marinho', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'b02',
    slug: 'bermuda-linho',
    name: 'Bermuda Linho',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 89.90,
    description: 'Bermuda em linho com textura natural e respirabilidade superior. Elegante e confortável, ideal para passeios e ocasiões casuais com mais sofisticação.',
    images: [],
    variants: [
      { color: 'Areia', size: 'P', stock: 0 },
      { color: 'Areia', size: 'M', stock: 0 },
      { color: 'Bege', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'b03',
    slug: 'bermuda-jeans',
    name: 'Bermuda Jeans',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 79.90,
    description: 'Bermuda jeans de corte limpo e tecido resistente. Clássico do guarda-roupa masculino para composições casuais do dia a dia.',
    images: [],
    variants: [
      { color: 'Azul médio', size: 'P', stock: 0 },
      { color: 'Azul médio', size: 'M', stock: 0 },
      { color: 'Azul escuro', size: 'M', stock: 0 },
    ],
  },

  // ── ACESSÓRIOS ────────────────────────────────────────────────────────────
  {
    id: 'a01',
    slug: 'cintos',
    name: 'Cintos',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 59.90,
    description: 'Cintos em couro e material sintético de qualidade, com fivelas robustas e acabamento cuidadoso. O detalhe que completa qualquer composição.',
    images: [],
    variants: [
      { color: 'Preto', size: '36', stock: 0 },
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Marrom', size: '38', stock: 0 },
    ],
  },
  {
    id: 'a02',
    slug: 'gravatas',
    name: 'Gravatas',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 49.90,
    description: 'Gravatas em tecido de qualidade com padrões clássicos e contemporâneos. Acabamento preciso para quem valoriza os detalhes na composição formal.',
    images: [],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marinho', size: 'Único', stock: 0 },
      { color: 'Bordô', size: 'Único', stock: 0 },
    ],
  },
  {
    id: 'a03',
    slug: 'carteiras',
    name: 'Carteiras',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 79.90,
    description: 'Carteiras masculinas em couro e material de alta qualidade. Design funcional com espaço inteligente para cartões, documentos e dinheiro.',
    images: [],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marrom', size: 'Único', stock: 0 },
    ],
  },
  {
    id: 'a04',
    slug: 'meias',
    name: 'Meias',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 19.90,
    description: 'Meias masculinas em algodão e fibras de qualidade. Conforto e durabilidade para o dia a dia, disponíveis em modelos cano curto e médio.',
    images: [],
    variants: [
      { color: 'Preto', size: '38-43', stock: 0 },
      { color: 'Branco', size: '38-43', stock: 0 },
      { color: 'Cinza', size: '38-43', stock: 0 },
    ],
  },
  {
    id: 'a05',
    slug: 'suspensorios',
    name: 'Suspensórios',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 49.90,
    description: 'Suspensórios com elástico de alta qualidade e presilhas resistentes. Funcional e estiloso, o acessório que faz a diferença nas composições formais.',
    images: [],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marinho', size: 'Único', stock: 0 },
    ],
  },

  // ── CALÇADOS ──────────────────────────────────────────────────────────────
  {
    id: 'cal01',
    slug: 'sapatos',
    name: 'Sapatos',
    category: 'Calçados',
    collection: 'Calçados',
    price: 199.90,
    description: 'Sapatos masculinos com couro de qualidade e solado resistente. Acabamento impecável e conforto para o uso prolongado, do social ao passeio.',
    images: [],
    variants: [
      { color: 'Preto', size: '40', stock: 0 },
      { color: 'Preto', size: '41', stock: 0 },
      { color: 'Preto', size: '42', stock: 0 },
      { color: 'Marrom', size: '40', stock: 0 },
      { color: 'Marrom', size: '41', stock: 0 },
    ],
  },
];

// ─── LOJAS ───────────────────────────────────────────────────────────────────

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
