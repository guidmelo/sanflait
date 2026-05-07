# Sanflait — Guia para Claude Code

> Este arquivo orienta o Claude Code (assistente de desenvolvimento) ao trabalhar neste projeto. Mantenha-o atualizado conforme o projeto evolui.

---

## 📦 O que é o projeto

Sanflait é uma **plataforma SaaS fullstack** para gestão de moda/varejo, combinando:

- **Site público institucional** estilo editorial premium (inspirado em foxtonbrasil.com.br)
- **Painel administrativo** estilo Power BI dark com KPIs, gráficos e BI
- **CRM** com pipeline visual (Kanban)
- **Tracking** com last-click attribution para vendedores
- **Multi-loja** com estoque por variante × loja
- **Gamificação** de vendedores via ranking

## 🏗️ Arquitetura

**Monorepo com pnpm workspaces:**

```
sanflait/
├── apps/
│   ├── web/      # React 18 + Vite + TS + Tailwind + Zustand + React Query
│   └── api/      # NestJS 10 + Prisma + PostgreSQL + Redis + JWT
├── package.json  # workspaces root
└── README.md
```

## 🎨 Identidades visuais (CRÍTICO — duas identidades distintas)

### 1. Site público (`/`, `/colecoes`, `/produtos/:slug`, `/lojas`, `/clube`)
- **Estética:** editorial, luxo refinado, atemporal
- **Cores:** cream `#FAF8F4` · charcoal `#1A1916` · gold `#B8973A` · bege/sand
- **Tipografia:** Cormorant Garamond (display serif, com itálicos) + Inter (corpo)
- **Layout:** hero fullscreen · grid editorial assimétrico · letter-spacing amplo · ZERO emojis
- **Tom:** "A Arte do Vestir Bem" · "Formas Atemporais" · "Para quem vive o agora"

### 2. Painel admin (`/app/*`)
- **Estética:** Power BI dark, denso de informação, profissional
- **Cores:** ink `#0E0E10` → `#34343A` · accents (blue/purple/teal/amber/red/green)
- **Tipografia:** Inter only · tamanhos pequenos (10–13px) · uppercase tracking-wider em labels
- **Layout:** sidebar 60px icon-only · KPI cards com barra colorida · gráficos compactos
- **Não confundir:** este é o painel INTERNO. Nunca aplicar Cormorant ou tom editorial aqui.

Os tokens estão em `apps/web/tailwind.config.ts`. **Sempre use as classes do tema** (`bg-ink-2`, `text-ink-text-1`, `border-line`, etc.) — nunca hardcode hex.

## 🛠️ Stack confirmado

| Camada | Tecnologia |
|---|---|
| Framework web | React 18 · Vite |
| Linguagem | TypeScript |
| Estilo | TailwindCSS (config customizada com 2 paletas) |
| Roteamento | React Router 6 |
| Estado | Zustand (auth, tracking) · React Query (server state) |
| Forms | React Hook Form + Zod |
| Charts | Recharts |
| Ícones | Lucide React |
| Animação | Framer Motion |
| Backend | NestJS 10 |
| ORM | Prisma 5 |
| BD | PostgreSQL 15 |
| Cache/Queue | Redis 7 + BullMQ |
| Auth | JWT (15min) + Refresh Token (30d) + Argon2 |
| Hash | argon2 (NÃO use bcrypt) |
| Validação | class-validator + Zod |
| Docs API | Swagger (`/docs`) |

## 🔐 Roles (RBAC)

```ts
enum Role { ADMIN, GERENTE, VENDEDOR, SUPORTE }
```

| Role | Acesso |
|---|---|
| ADMIN | Tudo |
| GERENTE | Loja + vendedores subordinados + relatórios |
| VENDEDOR | Apenas próprios clientes/vendas/métricas |
| SUPORTE | Apenas CRM + tickets |

A `AdminSidebar` filtra os itens por role automaticamente.

## 🚀 Como rodar

```bash
# 1. Instalar
pnpm install

# 2. Configurar envs
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env

# 3. Subir Postgres + Redis (use docker se quiser)
docker run -d --name sanflait-pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 postgres:15
docker run -d --name sanflait-redis -p 6379:6379 redis:7

# 4. Migrations + seed
cd apps/api
pnpm prisma migrate dev --name init
pnpm prisma db seed
cd ../..

# 5. Rodar tudo
pnpm dev
# → Web: http://localhost:5173
# → API: http://localhost:3333
# → Swagger: http://localhost:3333/docs
```

## 🔑 Credenciais demo

Após o seed:

| Email | Senha | Role |
|---|---|---|
| admin@sanflait.com | admin | ADMIN |
| gerente@sanflait.com | gerente | GERENTE |
| guilherme@sanflait.com | vendedor | VENDEDOR |

Há também um **modo offline** no frontend: a tela `/login` aceita os usuários `admin` / `gerente` / `vendedor` / `suporte` (cada um com senha igual ao usuário), usando dados mockados em `apps/web/src/lib/mock.ts`. Útil para testar UI sem o backend rodando.

## 🧭 Rotas principais

### Frontend (React Router)

**Públicas (PublicLayout · Foxton-style):**
- `/` — Home
- `/colecoes`, `/colecoes/:slug` — Catálogo
- `/produtos/:slug` — Detalhe do produto
- `/lojas` — Lojas físicas
- `/clube` — Clube de fidelidade
- `/r/:slug` — **Link único de vendedor** (captura atribuição, redireciona para `/`)
- `/login` — Auth

**Admin (AdminLayout · Dark Power BI):**
- `/app/dashboard` — Painel executivo (default)
- `/app/sales` — Vendas (tabela + filtros)
- `/app/customers` — Clientes
- `/app/crm` — Kanban (4 colunas: LEAD / EM_NEGOCIACAO / CONVERTIDO / PERDIDO)
- `/app/products` — Catálogo admin
- `/app/vendors` — Vendedores + links únicos
- `/app/analytics` — BI
- `/app/stores` — Lojas (admin)
- `/app/inventory` — Estoque multi-loja
- `/app/settings` — Configurações

### Backend (NestJS · prefixo `/api`)

| Endpoint | Auth | Descrição |
|---|---|---|
| `POST /auth/login` | público | retorna access + refresh + user |
| `POST /auth/refresh` | público | renova access |
| `POST /auth/logout` | público | revoga refresh |
| `GET /auth/me` | JWT | usuário atual |
| `GET /products` | público | lista (filtros: collection, category) |
| `GET /products/:slug` | público | detalhe |
| `GET /stores` | público | lojas físicas |
| `POST /tracking/sessions` | público | upsert sessão (last-click) |
| `POST /tracking/events` | público | log de evento (PAGE_VIEW, PRODUCT_VIEW...) |
| `GET /vendors` | JWT | lista |
| `GET /vendors/ranking` | JWT | ranking por receita |
| `GET /customers` | JWT | lista (filtros: status, vendorId, neighborhood) |
| `PATCH /customers/:id/status` | JWT | atualiza status (gera CrmLog) |
| `GET /sales` | JWT | lista (filtros: vendorId, status, from, to) |
| `POST /sales` | JWT | criar venda |
| `GET /crm/pipeline` | JWT | dados agrupados por status |
| `GET /analytics/dashboard` | JWT (ADMIN/GERENTE) | KPIs |
| `GET /analytics/funnel` | JWT (ADMIN/GERENTE) | funil |
| `GET /analytics/lead-sources` | JWT (ADMIN/GERENTE) | origens |
| `GET /analytics/monthly-revenue` | JWT (ADMIN/GERENTE) | série temporal |

## 📐 Padrões de código

### Frontend
- **Sempre** use o alias `@/...` para imports relativos do `src/`
- **Sempre** use `cn()` (de `@/lib/utils`) para mesclar classes Tailwind
- **Componentes** — preferir functions nomeadas, não default exports (exceto pages)
- **Mock vs API** — `apps/web/src/lib/mock.ts` é o fallback offline. Quando integrar com a API, criar um cliente axios em `lib/api.ts` e hooks React Query.
- **Styling**:
  - Site público → classes da paleta cream/charcoal, fonte serif, letter-spacing alto
  - Admin → classes da paleta ink/line/ink-text, fonte sans, tamanhos pequenos
- **Charts** Recharts — use as cores customizadas (`#3B82F6`, `#8B5CF6`, etc.) e estilos consistentes com `RevenueChart.tsx` como referência.

### Backend
- **Sempre** use `PrismaService` (já é Global, basta injetar)
- **Sempre** use `@UseGuards(JwtAuthGuard)` em endpoints protegidos
- **Sempre** use `@Roles(Role.X, Role.Y)` + `RolesGuard` para restrições por role
- **DTOs** com `class-validator` + `@ApiProperty` para Swagger
- **Senhas** — sempre `argon2.hash()` (NUNCA bcrypt)
- **Prisma** — usar `$transaction` para operações que envolvem múltiplas tabelas (ex: mudança de status do cliente + log)

## 🎯 Próximos passos sugeridos

Em ordem de prioridade:

1. **Integrar frontend ↔ backend** — criar `apps/web/src/lib/api.ts` (axios + interceptors JWT) e substituir mocks por hooks React Query
2. **Implementar exportação** — Excel via ExcelJS, PDF via Puppeteer (ver `apps/api/package.json`)
3. **WebSocket** — atualizações ao vivo do dashboard (Gateway NestJS)
4. **Upload de imagens de produtos** — Multer + Sharp + Supabase Storage
5. **Completar CRUDs** — endpoints PUT/DELETE para todas as entidades
6. **Testes** — Jest (unit) + Supertest (e2e)
7. **CI/CD** — GitHub Actions
8. **Deploy** — Vercel (web) + Render/Railway (api) + Supabase (Postgres + Storage)

## ⚠️ Coisas importantes a NÃO fazer

- ❌ **NÃO** misture as duas identidades visuais (cream no admin, dark no público)
- ❌ **NÃO** use Inter no site público (apenas Cormorant + Inter como fallback de corpo)
- ❌ **NÃO** use emojis no site público — quebra completamente o tom editorial
- ❌ **NÃO** use `bcrypt` (use `argon2`)
- ❌ **NÃO** crie endpoints sem `@ApiTags` e `@ApiBearerAuth` (quebra o Swagger)
- ❌ **NÃO** retorne `passwordHash`, `refreshTokens` ou `ipHash` em responses
- ❌ **NÃO** hardcode valores de cores — sempre use o tema Tailwind

## 🧱 Estrutura completa

```
sanflait/
├── CLAUDE.md                ← este arquivo
├── README.md
├── package.json             ← workspaces root
├── .gitignore
└── apps/
    ├── web/                 ← Frontend
    │   ├── package.json
    │   ├── vite.config.ts
    │   ├── tailwind.config.ts
    │   ├── tsconfig.json
    │   ├── postcss.config.js
    │   ├── index.html
    │   ├── .env.example
    │   └── src/
    │       ├── main.tsx
    │       ├── App.tsx          ← rotas
    │       ├── styles/globals.css
    │       ├── lib/
    │       │   ├── utils.ts     ← cn, formatBRL, etc.
    │       │   └── mock.ts      ← dados mock para dev offline
    │       ├── stores/
    │       │   ├── auth.ts      ← Zustand auth (com persist)
    │       │   └── tracking.ts  ← Zustand attribution
    │       ├── layouts/
    │       │   ├── PublicLayout.tsx
    │       │   └── AdminLayout.tsx
    │       ├── components/
    │       │   ├── public/      ← Foxton-style
    │       │   │   ├── PublicNav.tsx
    │       │   │   ├── PublicFooter.tsx
    │       │   │   └── WhatsAppFloat.tsx
    │       │   └── admin/       ← Power BI dark
    │       │       ├── AdminSidebar.tsx
    │       │       ├── AdminTopBar.tsx
    │       │       ├── KPICard.tsx
    │       │       ├── Card.tsx
    │       │       ├── RevenueChart.tsx
    │       │       ├── LeadSourceDonut.tsx
    │       │       ├── TrafficChart.tsx
    │       │       ├── SalesFunnel.tsx
    │       │       ├── VendorRanking.tsx
    │       │       └── RecentSales.tsx
    │       └── pages/
    │           ├── public/      (HomePage, CollectionPage, ProductPage, StoresPage, ClubePage, VendorLinkPage)
    │           ├── auth/        (LoginPage)
    │           └── admin/       (Dashboard, Sales, Customers, CRM, Products, Vendors, Analytics, Stores, Inventory, Settings)
    │
    └── api/                 ← Backend
        ├── package.json
        ├── tsconfig.json
        ├── nest-cli.json
        ├── .env.example
        ├── prisma/
        │   ├── schema.prisma     ← schema completo (ver seção Prisma abaixo)
        │   └── seed.ts           ← seed inicial com users + lojas + produtos
        └── src/
            ├── main.ts           ← bootstrap + Swagger + CORS
            ├── app.module.ts
            ├── prisma/
            │   ├── prisma.module.ts (Global)
            │   └── prisma.service.ts
            ├── common/
            │   ├── decorators/   (Roles, CurrentUser)
            │   └── guards/       (JwtAuthGuard, RolesGuard)
            └── modules/
                ├── auth/         ← login, refresh, logout, me
                ├── users/
                ├── vendors/
                ├── products/
                ├── customers/
                ├── sales/
                ├── stores/
                ├── tracking/     ← engine de last-click
                ├── analytics/    ← KPIs, funil, BI
                └── crm/          ← pipeline, logs, notas
```

## 🗄️ Modelo de dados (Prisma) — entidades-chave

- `User` (1:1 `Vendor`) — autenticação + role
- `Store` ← (1:N) `User`, `Vendor`, `Inventory`, `Sale`
- `Vendor` ← (1:N) `Customer`, `Sale`, `TrafficSession`
- `Product` ← (1:N) `ProductVariant`, `ProductPriceHistory`
- `ProductVariant` ← (1:N) `Inventory` (chave única `[storeId, variantId]`)
- `Customer` (status: LEAD/EM_NEGOCIACAO/CONVERTIDO/PERDIDO) ← (1:N) `Sale`, `CrmLog`
- `Sale` (channel + status) ← (1:N) `SaleItem`; pode referenciar `TrafficSession` (atribuição)
- `TrafficSession` ← (1:N) `TrafficEvent` (PAGE_VIEW, PRODUCT_VIEW, WHATSAPP_CLICK...)
- `CrmLog` — auditoria de mudanças de status, notas, follow-ups
- `Campaign` — gestão de UTMs

## 📊 Mocks vs Realidade

O frontend hoje usa **`apps/web/src/lib/mock.ts`** para todos os dados (produtos, vendedores, clientes, vendas, tráfego). Isso permite que a UI funcione **sem backend** rodando.

Quando for integrar com a API real:
1. Criar `apps/web/src/lib/api.ts` com axios + interceptors JWT
2. Criar hooks React Query (`useProducts()`, `useVendors()`, `useDashboard()`, etc.)
3. Substituir os imports de mock pelos hooks
4. Manter o mock como fallback de desenvolvimento offline (via `import.meta.env.VITE_USE_MOCK`)

---

Pronto. **Comece desenvolvendo pelo `pnpm dev`** e abra http://localhost:5173 + http://localhost:5173/login.
