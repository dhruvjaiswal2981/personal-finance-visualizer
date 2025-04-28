// src/global.d.ts
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient | undefined;
    }
  }
}

// This line is necessary to ensure the file is treated as a module
export {};