# apps/backend/Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app

# Salin package.json dan bun.lockb terlebih dahulu untuk memanfaatkan Docker's caching
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Salin sisa kode aplikasi Anda (sumber, skema prisma, tsconfig dll.)
COPY . .

# Set lingkungan ke produksi
ENV NODE_ENV=production

# Generate Prisma Client (ini penting dan sudah benar Anda tambahkan)
RUN bun run prisma:generate

# Bangun aplikasi TypeScript Anda
# Ini akan menjalankan script "build" di package.json Anda
RUN bun run build

# Perintah untuk menjalankan aplikasi Anda yang sudah terkompilasi
# Ini akan menjalankan script "start" di package.json Anda
CMD ["bun", "run", "start"]

EXPOSE 8080