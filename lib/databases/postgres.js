import pkg from "pg";
import dotenv from 'dotenv';
dotenv.config();
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL || `postgres://postgres:1606@localhost:5432/shortly`;

const pool = new Pool({
    connectionString: DATABASE_URL
});

await pool.connect();

export default pool;