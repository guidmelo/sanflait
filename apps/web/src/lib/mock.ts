// Catálogo Sanflait — fonte de dados offline (substitua por API quando disponível)
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

// ─── CATÁLOGO REAL SANFLAIT ───────────────────────────────────────────────────
// Para adicionar fotos: substitua os arquivos .jpg em public/produtos/{categoria}/{produto}/
// foto-principal.jpg → capa do produto
// detalhe-01.jpg     → segunda imagem da galeria
// detalhe-02.jpg     → terceira imagem da galeria

export const products: Product[] = [

  // ── CAMISAS MASCULINAS ──────────────────────────────────────────────────────
  {
    id: 'cm-01',
    slug: 'camisa-polo-masculina',
    name: 'Camisa Polo Masculina',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 99.90,
    description: 'Polo masculina confeccionada com tecido de alta qualidade e excelente acabamento. Versatilidade garantida para composições casuais e semi-formais no dia a dia.',
    images: [
      '/produtos/camisas-masculinas/camisa-polo/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-polo/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-polo/detalhe-02.jpg',
    ],
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
    id: 'cm-02',
    slug: 'camisa-basica-masculina',
    name: 'Camisa Básica Masculina',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 79.90,
    description: 'Camisa básica masculina de corte reto e caimento limpo. Peça essencial para composições do cotidiano com conforto e durabilidade.',
    images: [
      '/produtos/camisas-masculinas/camisa-basica/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-basica/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-basica/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Cinza', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-03',
    slug: 'camisa-social-masculina',
    name: 'Camisa Social Masculina',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 129.90,
    description: 'Social masculina com corte tradicional, tecido refinado e costura impecável. Ideal para o ambiente corporativo e ocasiões que exigem apresentação.',
    images: [
      '/produtos/camisas-masculinas/camisa-social/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-social/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-social/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Azul claro', size: 'M', stock: 0 },
      { color: 'Azul claro', size: 'G', stock: 0 },
    ],
  },
  {
    id: 'cm-04',
    slug: 'camisa-manga-longa-masculina',
    name: 'Camisa Manga Longa Masculina',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 109.90,
    description: 'Manga longa com tecido leve e modelagem confortável. Versátil para diversas ocasiões, do casual ao passeio, com toque de sofisticação.',
    images: [
      '/produtos/camisas-masculinas/camisa-manga-longa/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-manga-longa/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-manga-longa/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Cinza', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-05',
    slug: 'camisa-manga-longa-social-masculina',
    name: 'Camisa Manga Longa Social Masculina',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 139.90,
    description: 'Social de manga longa com tecido premium e caimento preciso. Para quem exige presença e elegância em reuniões e ambientes corporativos.',
    images: [
      '/produtos/camisas-masculinas/camisa-manga-longa-social/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-manga-longa-social/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-manga-longa-social/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Branco', size: 'G', stock: 0 },
      { color: 'Azul claro', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-06',
    slug: 'camisa-tecido-botao',
    name: 'Camisa Tecido de Botão',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 119.90,
    description: 'Camisa de tecido com abotoamento frontal e modelagem clean. Equilíbrio perfeito entre o despojado e o elegante para composições variadas.',
    images: [
      '/produtos/camisas-masculinas/camisa-tecido-botao/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-tecido-botao/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-tecido-botao/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Bege', size: 'P', stock: 0 },
      { color: 'Bege', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-07',
    slug: 'camisa-trabalhada',
    name: 'Camisa Trabalhada',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 129.90,
    badge: 'Destaque',
    description: 'Camisa com detalhes trabalhados e textura diferenciada. Para quem busca destaque nas composições sem abrir mão do refinamento.',
    images: [
      '/produtos/camisas-masculinas/camisa-trabalhada/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-trabalhada/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-trabalhada/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-08',
    slug: 'camisa-canelada',
    name: 'Camisa Canelada',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 89.90,
    description: 'Camisa em tecido canelado com textura marcante e toque agradável. Visual contemporâneo e confortável para o uso diário.',
    images: [
      '/produtos/camisas-masculinas/camisa-canelada/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-canelada/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-canelada/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Cinza', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cm-09',
    slug: 'camisa-xadrez',
    name: 'Camisa Xadrez',
    category: 'Camisas',
    collection: 'Camisas Masculinas',
    price: 99.90,
    description: 'Camisa xadrez clássica com estampa equilibrada e tecido durável. Versatilidade garantida para composições casuais e passeio.',
    images: [
      '/produtos/camisas-masculinas/camisa-xadrez/foto-principal.jpg',
      '/produtos/camisas-masculinas/camisa-xadrez/detalhe-01.jpg',
      '/produtos/camisas-masculinas/camisa-xadrez/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Azul/Branco', size: 'P', stock: 0 },
      { color: 'Azul/Branco', size: 'M', stock: 0 },
      { color: 'Vermelho/Preto', size: 'M', stock: 0 },
    ],
  },

  // ── CAMISAS FEMININAS ───────────────────────────────────────────────────────
  {
    id: 'cf-01',
    slug: 'camisa-polo-feminina',
    name: 'Camisa Polo Feminina',
    category: 'Camisas',
    collection: 'Camisas Femininas',
    price: 99.90,
    description: 'Polo feminina com modelagem estruturada e tecido respirável. Praticidade e sofisticação para o cotidiano moderno.',
    images: [
      '/produtos/camisas-femininas/camisa-polo/foto-principal.jpg',
      '/produtos/camisas-femininas/camisa-polo/detalhe-01.jpg',
      '/produtos/camisas-femininas/camisa-polo/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'cf-02',
    slug: 'camisa-basica-feminina',
    name: 'Camisa Básica Feminina',
    category: 'Camisas',
    collection: 'Camisas Femininas',
    price: 79.90,
    description: 'Camisa básica feminina com modelagem versátil e tecido macio. Essencial no guarda-roupa de quem valoriza simplicidade com estilo.',
    images: [
      '/produtos/camisas-femininas/camisa-basica/foto-principal.jpg',
      '/produtos/camisas-femininas/camisa-basica/detalhe-01.jpg',
      '/produtos/camisas-femininas/camisa-basica/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Branco', size: 'P', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
    ],
  },

  // ── CALÇAS ──────────────────────────────────────────────────────────────────
  {
    id: 'ca-01',
    slug: 'calca-jeans',
    name: 'Calça Jeans',
    category: 'Calças',
    collection: 'Calças',
    price: 129.90,
    description: 'Calça jeans de corte reto com tecido de qualidade e ótimo caimento. Clássico indispensável para composições casuais e passeio.',
    images: [
      '/produtos/calcas/calca-jeans/foto-principal.jpg',
      '/produtos/calcas/calca-jeans/detalhe-01.jpg',
      '/produtos/calcas/calca-jeans/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Azul médio', size: '38', stock: 0 },
      { color: 'Azul médio', size: '40', stock: 0 },
      { color: 'Azul escuro', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
    ],
  },
  {
    id: 'ca-02',
    slug: 'calca-sarja',
    name: 'Calça Sarja',
    category: 'Calças',
    collection: 'Calças',
    price: 119.90,
    description: 'Calça em sarja com corte reto e caimento confortável. Durabilidade e praticidade para o dia a dia, com visual limpo e versátil.',
    images: [
      '/produtos/calcas/calca-sarja/foto-principal.jpg',
      '/produtos/calcas/calca-sarja/detalhe-01.jpg',
      '/produtos/calcas/calca-sarja/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Areia', size: '38', stock: 0 },
      { color: 'Areia', size: '40', stock: 0 },
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
    ],
  },
  {
    id: 'ca-03',
    slug: 'calca-social',
    name: 'Calça Social',
    category: 'Calças',
    collection: 'Calças',
    price: 149.90,
    description: 'Calça social com tecido refinado e modelagem precisa. Para ambientes corporativos e ocasiões que exigem apresentação impecável.',
    images: [
      '/produtos/calcas/calca-social/foto-principal.jpg',
      '/produtos/calcas/calca-social/detalhe-01.jpg',
      '/produtos/calcas/calca-social/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Preto', size: '40', stock: 0 },
      { color: 'Marinho', size: '38', stock: 0 },
      { color: 'Marinho', size: '40', stock: 0 },
    ],
  },

  // ── BERMUDAS ────────────────────────────────────────────────────────────────
  {
    id: 'bm-01',
    slug: 'bermuda-jeans',
    name: 'Bermuda Jeans',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 79.90,
    description: 'Bermuda jeans de corte limpo e tecido resistente. Clássico do guarda-roupa masculino para composições casuais do dia a dia.',
    images: [
      '/produtos/bermudas/bermuda-jeans/foto-principal.jpg',
      '/produtos/bermudas/bermuda-jeans/detalhe-01.jpg',
      '/produtos/bermudas/bermuda-jeans/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Azul médio', size: 'P', stock: 0 },
      { color: 'Azul médio', size: 'M', stock: 0 },
      { color: 'Azul escuro', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'bm-02',
    slug: 'bermuda-tactel',
    name: 'Bermuda Tactel',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 69.90,
    description: 'Bermuda em tactel leve e de secagem rápida. Perfeita para o clima do Nordeste, com conforto total para lazer e dia a dia.',
    images: [
      '/produtos/bermudas/bermuda-tactel/foto-principal.jpg',
      '/produtos/bermudas/bermuda-tactel/detalhe-01.jpg',
      '/produtos/bermudas/bermuda-tactel/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Marinho', size: 'M', stock: 0 },
    ],
  },
  {
    id: 'bm-03',
    slug: 'bermuda-linho',
    name: 'Bermuda Linho',
    category: 'Bermudas',
    collection: 'Bermudas',
    price: 89.90,
    description: 'Bermuda em linho com textura natural e respirabilidade superior. Elegante e confortável para passeios e ocasiões casuais com mais sofisticação.',
    images: [
      '/produtos/bermudas/bermuda-linho/foto-principal.jpg',
      '/produtos/bermudas/bermuda-linho/detalhe-01.jpg',
      '/produtos/bermudas/bermuda-linho/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Areia', size: 'P', stock: 0 },
      { color: 'Areia', size: 'M', stock: 0 },
      { color: 'Bege', size: 'M', stock: 0 },
    ],
  },

  // ── ACESSÓRIOS ──────────────────────────────────────────────────────────────
  {
    id: 'ac-01',
    slug: 'cinto',
    name: 'Cinto',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 59.90,
    description: 'Cinto em couro e material de qualidade com fivela robusta e acabamento cuidadoso. O detalhe que completa qualquer composição.',
    images: [
      '/produtos/acessorios/cinto/foto-principal.jpg',
      '/produtos/acessorios/cinto/detalhe-01.jpg',
      '/produtos/acessorios/cinto/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: '36', stock: 0 },
      { color: 'Preto', size: '38', stock: 0 },
      { color: 'Marrom', size: '38', stock: 0 },
    ],
  },
  {
    id: 'ac-02',
    slug: 'suspensorio',
    name: 'Suspensório',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 49.90,
    description: 'Suspensório com elástico de qualidade e presilhas resistentes. Funcional e estiloso, o acessório que diferencia nas composições formais.',
    images: [
      '/produtos/acessorios/suspensorio/foto-principal.jpg',
      '/produtos/acessorios/suspensorio/detalhe-01.jpg',
      '/produtos/acessorios/suspensorio/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marinho', size: 'Único', stock: 0 },
    ],
  },
  {
    id: 'ac-03',
    slug: 'carteira',
    name: 'Carteira',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 79.90,
    description: 'Carteira masculina em material de alta qualidade. Design funcional com compartimentos para cartões, documentos e dinheiro.',
    images: [
      '/produtos/acessorios/carteira/foto-principal.jpg',
      '/produtos/acessorios/carteira/detalhe-01.jpg',
      '/produtos/acessorios/carteira/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marrom', size: 'Único', stock: 0 },
    ],
  },
  {
    id: 'ac-04',
    slug: 'gravata',
    name: 'Gravata',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 49.90,
    description: 'Gravata em tecido de qualidade com padrões clássicos e contemporâneos. Acabamento preciso para quem valoriza os detalhes na composição formal.',
    images: [
      '/produtos/acessorios/gravata/foto-principal.jpg',
      '/produtos/acessorios/gravata/detalhe-01.jpg',
      '/produtos/acessorios/gravata/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'Único', stock: 0 },
      { color: 'Marinho', size: 'Único', stock: 0 },
      { color: 'Bordô', size: 'Único', stock: 0 },
    ],
  },
  {
    id: 'ac-05',
    slug: 'meia',
    name: 'Meia',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 19.90,
    description: 'Meias masculinas em algodão e fibras de qualidade. Conforto e durabilidade para o dia a dia, em modelos cano curto e médio.',
    images: [
      '/produtos/acessorios/meia/foto-principal.jpg',
      '/produtos/acessorios/meia/detalhe-01.jpg',
      '/produtos/acessorios/meia/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: '38-43', stock: 0 },
      { color: 'Branco', size: '38-43', stock: 0 },
      { color: 'Cinza', size: '38-43', stock: 0 },
    ],
  },
  {
    id: 'ac-06',
    slug: 'cueca',
    name: 'Cueca',
    category: 'Acessórios',
    collection: 'Acessórios',
    price: 29.90,
    description: 'Cueca masculina em tecido macio e respirável. Conforto e qualidade para o uso diário, disponível em modelos boxer e slip.',
    images: [
      '/produtos/acessorios/cueca/foto-principal.jpg',
      '/produtos/acessorios/cueca/detalhe-01.jpg',
      '/produtos/acessorios/cueca/detalhe-02.jpg',
    ],
    variants: [
      { color: 'Preto', size: 'P', stock: 0 },
      { color: 'Preto', size: 'M', stock: 0 },
      { color: 'Branco', size: 'M', stock: 0 },
    ],
  },

  // ── CALÇADOS ────────────────────────────────────────────────────────────────
  {
    id: 'cl-01',
    slug: 'sapato',
    name: 'Sapato',
    category: 'Calçados',
    collection: 'Calçados',
    price: 199.90,
    description: 'Sapato masculino com material de qualidade e solado resistente. Acabamento impecável e conforto para uso prolongado, do social ao passeio.',
    images: [
      '/produtos/calcados/sapato/foto-principal.jpg',
      '/produtos/calcados/sapato/detalhe-01.jpg',
      '/produtos/calcados/sapato/detalhe-02.jpg',
    ],
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
