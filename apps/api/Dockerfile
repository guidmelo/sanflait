FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm prisma generate
RUN pnpm build

# ─── Production stage ───────────────────────────────────────────────────────
FROM node:20-alpine AS runner

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma
COPY prisma ./prisma

EXPOSE 3333

CMD ["node", "dist/main"]
