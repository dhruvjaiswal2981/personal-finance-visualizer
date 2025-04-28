import { PrismaClient } from '@prisma/client';

// Extend the global object type to include prisma
declare global {
  var prisma: PrismaClient | undefined;
}

class PrismaSingleton {
  private static prismaInstance: PrismaClient;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  static getInstance(): PrismaClient {
    if (!PrismaSingleton.prismaInstance) {
      PrismaSingleton.prismaInstance = new PrismaClient();
    }
    return PrismaSingleton.prismaInstance;
  }
}

// Get the PrismaClient instance
const prisma = PrismaSingleton.getInstance();

// Only set the global instance in development mode to prevent multiple instances in production
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
