import { Prisma, PrismaClient } from '@/generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
import 'server-only';

const connectionString = process.env.DATABASE_URL || '';

const pool = new pkg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const getLogOptions = (): (Prisma.LogLevel | Prisma.LogDefinition)[] => {
    if (process.env.NODE_ENV === 'production') {
        return ['error'];
    }

    if (process.env.NODE_ENV === 'test') {
        return ['error'];
    }

    return ['query', 'info', 'warn', 'error'];
};

const prismaClientSingleton = () =>
    new PrismaClient({
        adapter,
        log: getLogOptions(),
    });

const globalForPrisma = globalThis as unknown as {
    prisma: ReturnType<typeof prismaClientSingleton> | undefined;
};

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
