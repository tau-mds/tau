# syntax=docker/dockerfile:1.4

FROM node:22-alpine3.20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune @tau/app --docker

FROM base AS installer

RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY --from=builder /app/out/json/ .
RUN pnpm install --frozen-lockfile

COPY --from=builder /app/out/full/ .
RUN pnpm turbo run build

RUN --mount=type=secret,id=DATABASE_URL \
    --mount=type=secret,id=DATABASE_CONN_TYPE \
    --mount=type=secret,id=DATABASE_AUTH_TOKEN \
    DATABASE_URL=$(cat /run/secrets/DATABASE_URL) \
    DATABASE_CONN_TYPE=$(cat /run/secrets/DATABASE_CONN_TYPE) \
    DATABASE_AUTH_TOKEN=$(cat /run/secrets/DATABASE_AUTH_TOKEN) \
    pnpm migrate:prod


FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 tau
RUN adduser --system --uid 1001 app
USER app

COPY --from=builder --chown=tau:app /app/out/json/ .
COPY --from=installer --chown=tau:app /app/node_modules /app/node_modules
COPY --from=installer --chown=tau:app /app/apps/app/.output /app/apps/app/.output

WORKDIR /app/apps/app
CMD ["pnpm", "start"]
