import 'dotenv/config';
import { defineConfig } from 'prisma/config';

const DATABASE_ORIGINAL_URL = process.env.DATABASE_URL || '';

let databaseUrl = DATABASE_ORIGINAL_URL;

if (databaseUrl && !databaseUrl.includes('sslmode=verify-full')) {
    if (databaseUrl.includes('?')) {
        databaseUrl = databaseUrl.replace(/sslmode=[^&]+/, 'sslmode=verify-full');
        if (!databaseUrl.includes('sslmode=verify-full')) {
            databaseUrl += '&sslmode=verify-full';
        }
    } else {
        databaseUrl += '?sslmode=verify-full';
    }
}

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: databaseUrl,
    },
});
