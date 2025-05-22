import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres';
import fs from 'fs';
import path from 'path';
import { Pool } from 'pg';
import { fileURLToPath } from 'url';

config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caCertPath = path.resolve(__dirname, '../../cert/ca-certificate.crt');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync(caCertPath).toString(),
    },
});

const db = drizzle(pool);

export { db };
