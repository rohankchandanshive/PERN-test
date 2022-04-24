const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: '1711',
    host: 'localhost',
    port: 5432,
    database: 'perntodo'
});

module.exports = pool;