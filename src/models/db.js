const { Pool } = require('pg');

const pool = new Pool({
    user: "milanjunges", //process.env.DB_USER,
    host: "localhost", //process.env.DB_HOST,
    database: "theroom", //process.env.DB_NAME,
    password: "mimi0393", //process.env.PASSWORD,
    port: 5432 //process.env.DB_PORT,
});

module.exports = pool;