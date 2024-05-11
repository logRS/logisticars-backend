import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_HOST : process.env.DB_HOST,
    port: process.env.NODE_ENV === 'test' ? Number(process.env.TEST_DB_PORT) : Number(process.env.DB_PORT),
    username: process.env.NODE_ENV === 'test' ? String(process.env.TEST_DB_USER): process.env.DB_USER,
    password: process.env.NODE_ENV === 'test' ? String(process.env.TEST_DB_PASS): process.env.DB_PASSWORD,
    database: process.env.NODE_ENV === 'test' ? process.env.TEST_DB_NAME : process.env.DB_NAME,
    logging: true,
    synchronize: process.env.NODE_ENV ==='test',
    entities: process.env.NODE_ENV === 'production' ? ['build/entities/**/*.js'] : [join(__dirname, './entities/**/*.ts')],
    subscribers: process.env.NODE_ENV === 'production' ? ['build/subscribers/**/*.js'] : [join(__dirname, './subscribers/**/*.ts')],
    migrations: process.env.NODE_ENV === 'production' ? ['build/migrations/**/*.js'] : [join(__dirname, './migrations/**/*.ts')],
});