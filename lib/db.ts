import { PrismaClient } from "@/app/generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // Prisma v7 with prisma+postgres:// URL requires accelerateUrl
  const url = process.env.DATABASE_URL ?? "";
  if (url.startsWith("prisma+postgres://")) {
    return new PrismaClient({ accelerateUrl: url });
  }
  // For direct PostgreSQL URLs (e.g., Neon in production)
  // You'll need to install @prisma/adapter-pg and pass an adapter here
  return new PrismaClient({ accelerateUrl: url });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
