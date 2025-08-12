# Dockerfile (File ini HARUS berada di root folder repositori Anda)

FROM oven/bun:1-alpine

# Set global git config to avoid line ending issues (optional, but good for troubleshooting)
# RUN git config --global core.autocrlf false

# Set the working directory inside the container to where your backend code will reside
WORKDIR /app/backend

# Copy backend-specific package files and the root lockfile
# Konteks build adalah root repositori, jadi jalurnya dimulai dari sana.
COPY apps/backend/package.json ./package.json
COPY bun.lock ./bun.lock

# --- DEBUGGING STEP (PERTahankan ini untuk diagnosis) ---
RUN echo "DEBUG: Files in /app/backend before bun install:" && ls -la . && \
    echo "DEBUG: Content of package.json:" && cat package.json && \
    echo "DEBUG: Content of bun.lock (first 100 lines):" && head -n 100 bun.lock
# --- AKHIR DEBUGGING STEP ---

# Install dependencies - HAPUS --frozen-lockfile untuk mengatasi error
RUN bun install # <--- INI KUNCI PERUBAHANNYA: Hapus --frozen-lockfile

# --- DEBUGGING STEP ---
RUN echo "DEBUG: Files in /app/backend after bun install:" && ls -la . && \
    echo "DEBUG: Content of node_modules (partial):" && ls -la node_modules/ || echo "node_modules not found!"
# --- AKHIR DEBUGGING STEP ---

# Salin sisa kode aplikasi backend dan file penting lainnya
COPY apps/backend/src ./src
COPY apps/backend/prisma ./prisma
COPY apps/backend/tsconfig.json ./tsconfig.json 

# Set lingkungan ke produksi
ENV NODE_ENV=production

# Generate Prisma Client (berjalan dari /app/backend)
RUN bun run prisma:generate

# --- DEBUGGING STEP ---
RUN ls -la /app/src/generated/prisma || echo "DEBUG: /app/src/generated/prisma not found or empty after generation."
RUN cat /app/src/generated/prisma/index.d.ts || echo "DEBUG: index.d.ts not found in generated/prisma!"
# --- AKHIR DEBUGGING STEP ---

# Bangun aplikasi TypeScript Anda (berjalan dari /app/backend)
RUN bun run build

# Perintah untuk memulai aplikasi Anda yang sudah terkompilasi (berjalan dari /app/backend)
CMD ["bun", "run", "start"]

EXPOSE 8080