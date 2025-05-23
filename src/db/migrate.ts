import { db } from '@/db/index';
import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

config({ path: '.env.local' });

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: './drizzle',
        });
        console.log('Migrations completed successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Error during migrations:', error);
        process.exit(1);
    }
};

main();
