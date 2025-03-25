const { Pool } = require('pg');
require('dotenv').config();

const adminPool = new Pool({
    connectionString: 'postgres://postgres:postgres@localhost:5432/postgres'
});

async function initializeDatabase() {
    const client = await adminPool.connect();
    try {
        const dbCheck = await client.query("SELECT 1 FROM pg_database WHERE datname = 'amtech'");
        if (dbCheck.rowCount === 0) {
            await client.query('CREATE DATABASE amtech');
            console.log('Database "amtech" created');
        } else {
            console.log('Database "amtech" already exists');
        }
    } catch (err) {
        console.error('Error creating database:', err.stack);
    } finally {
        client.release();
        await adminPool.end(); 
    }
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
async function setupTable() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Users table created or already exists');
    } catch (err) {
        console.error('Error creating table:', err.stack);
    }
}

(async () => {
    await initializeDatabase();
    await setupTable();
})();

module.exports = pool;