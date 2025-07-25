FROM oven/bun:1-alpine
WORKDIR /app
COPY . .
RUN bun install

ENV NODE_ENV=development
RUN bun run build

CMD ["bun", "run", "preview"]

EXPOSE 3000