# apps/backend/Dockerfile
FROM oven/bun:1-alpine

WORKDIR /app

# Salin package.json dan bun.lockb terlebih dahulu
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Salin *semua* kode aplikasi, termasuk folder 'prisma'
# (Ini penting agar Prisma dapat menemukan schema.prisma)
COPY . .

# Set lingkungan ke produksi
ENV NODE_ENV=production

# Jalankan prisma generate SECARA EKSPLISIT di sini.
# Ini memastikan klien Prisma digenerate sebelum langkah 'bun run build'.
RUN bun run prisma:generate 

# Bangun aplikasi TypeScript Anda
RUN bun run build

# Perintah untuk memulai aplikasi Anda yang sudah terkompilasi
CMD ["bun", "run", "start"]

EXPOSE 8080