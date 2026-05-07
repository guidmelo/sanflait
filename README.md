# Sanflait — CRM & Sales Intelligence Platform

> Plataforma SaaS fullstack para gestão de produtos, vendedores, CRM, tracking e BI comercial — com identidade visual editorial premium (estilo Foxton) no site público e dashboards estilo Power BI dark nos painéis internos.

---

## Stack

**Frontend** — React 18 · Vite · TypeScript · TailwindCSS · React Router · Zustand · Framer Motion · Recharts · Lucide Icons

**Backend** — Node.js · NestJS · Prisma ORM · PostgreSQL · Redis · JWT + Refresh Token · RBAC · Swagger · BullMQ · Zod

**Infra** — Vercel (web) · Render (api) · Supabase (Postgres + Storage)

---

## Estrutura

```
sanflait/
├── apps/
│   ├── web/        # React + Vite frontend
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── public/   # Site institucional estilo Foxton
│   │   │   │   ├── admin/    # Painel dark estilo Power BI
│   │   │   │   └── auth/     # Login, signup
│   │   │   ├── components/
│   │   │   │   ├── public/   # Nav, Footer, ProductCard, Hero...
│   │   │   │   ├── admin/    # Sidebar, KPI, Charts, Funnel...
│   │   │   │   └── ui/       # Button, Input, Modal, Pill...
│   │   │   ├── layouts/      # PublicLayout, AdminLayout, AuthLayout
│   │   │   ├── stores/       # Zustand stores (auth, ui, cart)
│   │   │   ├── lib/          # api client, formatters, utils
│   │   │   ├── routes/       # Route config + guards
│   │   │   └── hooks/        # useTracking, useAuth...
│   │   └── tailwind.config.ts
│   └── api/        # NestJS backend
│       ├── src/
│       │   ├── modules/      # auth, vendors, products, sales, tracking...
│       │   ├── common/       # guards, decorators, filters
│       │   └── prisma/       # PrismaService
│       └── prisma/
│           ├── schema.prisma
│           └── seed.ts
└── package.json    # workspaces
```

---

## Identidades Visuais

### Site público (`/`, `/colecoes`, `/produtos/:slug`, `/lojas`, `/r/:vendor-slug`)
Inspirado em **foxtonbrasil.com.br** — estética editorial premium, tipografia serifada (Cormorant Garamond), paleta cream/charcoal/gold, hero fullscreen, navegação minimalista, hover effects cinematográficos.

### Painel interno (`/app/*`)
Dark mode estilo **Power BI** — background `#0E0E10`, sidebar icon-only, KPIs com barra de cor na base, gráficos Recharts customizados, funil de vendas, ranking de vendedores, exportação Excel/PDF.

---

## Rodando localmente

### 1. Pré-requisitos
- Node 20+
- pnpm 9+ (ou npm/yarn)
- PostgreSQL 15+
- Redis 7+

### 2. Instalar
```bash
pnpm install
```

### 3. Configurar `.env`
```bash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env
```

### 4. Migrations + seed
```bash
cd apps/api
pnpm prisma migrate dev
pnpm prisma db seed
```

### 5. Rodar tudo
```bash
# raiz do projeto
pnpm dev
```

- Web → http://localhost:5173
- API → http://localhost:3333
- Swagger → http://localhost:3333/docs

---

## Roles (RBAC)

| Role | Acesso |
|---|---|
| `ADMIN` | Total — todos os módulos |
| `GERENTE` | Loja + vendedores subordinados + relatórios |
| `VENDEDOR` | Apenas próprios clientes/vendas/métricas |
| `SUPORTE` | Apenas CRM + tickets |

---

## Módulos principais

- **Tracking engine** — sessões, eventos, UTMs, last-click attribution (30 dias)
- **CRM** — pipeline LEAD → EM_NEGOCIACAO → CONVERTIDO / PERDIDO
- **Catálogo** — produtos · variantes · histórico de preços · estoque multi-loja
- **Vendas** — registro manual, vínculo automático a vendedor via cookie/session
- **Analytics** — funil, ranking, conversão por origem, BI temporal
- **Gamificação** — ranking de vendedores por receita/conversão/leads
- **Exportação** — Excel (ExcelJS), PDF (Puppeteer), Print CSS

---

## Licença
Privado. © 2026 Sanflait.
