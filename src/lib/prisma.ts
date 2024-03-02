import { PrismaClient } from "@prisma/client";

export let prisma: PrismaClient;

// export const prisma = new PrismaClient();
export const createPrismaInstance = (dbUrl: string) => {
  prisma = new PrismaClient({
    datasources: { db: { url: dbUrl } },
  });
};
