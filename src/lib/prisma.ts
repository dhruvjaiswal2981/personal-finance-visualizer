import { PrismaClient } from '@prisma/client';

// Extend the global object type to include prisma
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

class PrismaSingleton {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaSingleton.instance) {
      PrismaSingleton.instance = new PrismaClient();
    }
    return PrismaSingleton.instance;
  }
}

// Get the PrismaClient instance
const prisma = PrismaSingleton.getInstance();

// Only set the global instance in development mode to prevent multiple instances in production
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;