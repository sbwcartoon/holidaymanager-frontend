FROM node:20-alpine AS deps
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
ARG API_HOST_URL
ENV API_HOST_URL=$API_HOST_URL
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
