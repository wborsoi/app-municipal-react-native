const sql = require('mssql')

const dbConfig = {
    user: 'api_adm',
    password: '1234',
    server: 'localhost',
    database: 'Municipal_Test',
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

async function getConnection() {
    try {
        const pool = await sql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {getConnection};