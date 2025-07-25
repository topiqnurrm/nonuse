# Dockerfile (File ini HARUS berada di root folder repositori Anda)

FROM oven/bun:1-alpine

# Set working directory di dalam container ke lokasi backend Anda
# Ini adalah folder tempat aplikasi backend Anda akan berada di dalam container.
WORKDIR /app/backend

# Salin package.json backend dan lockfile dari root repositori
# Konteks build adalah root repositori, jadi jalurnya dimulai dari sana.
COPY apps/backend/package.json ./package.json 
COPY bun.lock ./bun.lock 

# Install dependencies (Bun akan menggunakan bun.lock yang baru disalin)
RUN bun install --frozen-lockfile

# Salin sisa kode aplikasi backend dan file penting lainnya
COPY apps/backend/src ./src
COPY apps/backend/prisma ./prisma
COPY apps/backend/tsconfig.json ./tsconfig.json 

# Set lingkungan ke produksi
ENV NODE_ENV=production

# Generate Prisma Client (ini akan berjalan dari /app/backend/)
RUN bun run prisma:generate

# Bangun aplikasi TypeScript Anda (ini akan berjalan dari /app/backend/)
RUN bun run build

# Perintah untuk menjalankan aplikasi Anda yang sudah terkompilasi (ini akan berjalan dari /app/backend/)
CMD ["bun", "run", "start"]

EXPOSE 8080