import { PrismaClient } from '@prisma/client';

/**
 * Prisma client instance for interacting with the database.
 *
 * In production, a new PrismaClient instance is created for each request.
 * In development, the PrismaClient instance is shared globally to optimize performance.
 */
let prisma: PrismaClient;

// Check if the environment is production
if (process.env.NODE_ENV === 'production') {
  // Create a new PrismaClient instance for each request in production
  prisma = new PrismaClient();
} else {
  // Access the global object and attach PrismaClient to it for sharing in development
  const globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  };

  // Create a new PrismaClient instance if it doesn't exist in the global context
  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  // Use the shared PrismaClient instance in development
  prisma = globalWithPrisma.prisma;
}

// Export the Prisma client instance
export default prisma;


