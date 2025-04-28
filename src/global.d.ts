// global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Augment globalThis directly to include prisma
  namespace NodeJS {
    interface Global {
      prisma?: PrismaClient;
    }
  }

  // Alternatively, you could directly augment globalThis:
  interface GlobalThis {
    prisma?: PrismaClient;
  }
}

export {};
