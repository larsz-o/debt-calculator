const pg = require('pg');
const url = require('url');

let config = {};

if(process.env.DATABASE_URL) {
    const params = url.parse(process.env.DATABASE_URL);
    const auth = params.auth.split(':');

    config = {
        user: auth[0],
        password: auth[1],
        host: params.hostname, 
        port: params.port,
        database: params.pathname.split('/')[1],
        ssl: true, 
        max: 10,
        idleTimeoutMillis: 30000,
    };
} else {
    config = {
        host: process.env.DEV_HOST,
        port: process.env.DEV_PORT, 
        database: process.env.DEV_DB,
        user: process.env.DEV_USER,
        password: process.env.DEV_PW,
        ssl: true, 
        max: 10, 
        idleTimeoutMillis: 30000
    }
}

const pool = new pg.Pool(config);

pool.on('error', (error) => {
    console.log('Unexpected error on idle client', error);
    process.exit(-1);
});

module.exports = pool;