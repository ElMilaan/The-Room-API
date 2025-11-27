require('dotenv').config();
const { Pool } = require('pg');

// BIEN METTRE LES BONS LOGS DANS le .env

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;