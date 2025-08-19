import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER || 'product_explorer_user',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'product_explorer_db',
    password: process.env.DB_PASSWORD || 'explorer',
    port: parseInt(process.env.DB_PORT || '5432', 10),
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
