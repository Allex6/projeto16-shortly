import pkg from "pg";
const { Pool } = pkg;

const POSTGRES_CONNECTION_URL = process.env.POSTGRES_CONNECTION_URL || `postgres://postgres:1606@localhost:5432/shortly`;

const pool = new Pool({
    connectionString: POSTGRES_CONNECTION_URL
});

await pool.connect();

export default pool;