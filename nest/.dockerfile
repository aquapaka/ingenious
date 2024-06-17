FROM node:20-alpine as builder

# Build Stage
WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .
RUN pnpm run build

# Production Stage
FROM node:20-alpine

WORKDIR /app
RUN npm install -g pnpm
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
ENV PORT=4000
ENV NODE_ENV=Production
COPY --from=builder /app/dist ./dist
EXPOSE ${PORT}

CMD ["pnpm", "run", "start:prod"]
