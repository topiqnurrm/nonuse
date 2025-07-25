import { PrismaNeon } from "@prisma/adapter-neon";

// import { PrismaClient } from "@/generated/prisma";
import { PrismaClient } from '../generated/prisma';

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({
  ...(process.env.NODE_ENV !== "development" ? { adapter } : undefined),
});

export default prisma;
