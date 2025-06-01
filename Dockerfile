# -------- builder stage --------
FROM node:20-slim AS builder
# bash は slim 系イメージで既に入っています
WORKDIR /app

# Yarn を有効化（Node 18+ は corepack で同梱）
RUN corepack enable

# 依存関係インストール
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# アプリソース
COPY . .

# 本番用ビルド
RUN yarn build


# -------- runtime stage --------
FROM node:20-slim

WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3010

# Yarn （corepack）有効化
RUN corepack enable

# builder で生成した成果物をコピー
COPY --from=builder /app ./

EXPOSE 3010

# Next.js を本番モードで起動
CMD ["yarn", "start", "-p", "3010"]