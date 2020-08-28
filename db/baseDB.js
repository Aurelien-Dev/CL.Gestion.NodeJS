const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWD,
    port: process.env.PG_PORT,
    ssl: {
        rejectUnauthorized: (process.env.PG_SSL === 'true' ? true : false)
    }
});



module.exports = {
    query: (text, params, callback) => {
        const start = Date.now();
        return pool.query(text, params, (err, res) => {
            const duration = Date.now() - start;

            if (typeof err != 'undefined') {
                throw err;
            }

            console.log('executed query', { text, duration, rows: res.rowCount });
            callback(err, res);
        });
    },
    getClient: (callback) => {
        pool.connect((err, client, done) => {
            const query = client.query;

            // monkey patch the query method to keep track of the last query executed
            client.query = (...args) => {
                client.lastQuery = args
                return query.apply(client, args)
            };

            // set a timeout of 5 seconds, after which we will log this client's last query
            const timeout = setTimeout(() => {
                console.error('A client has been checked out for more than 5 seconds!')
                console.error(`The last executed query on this client was: ${client.lastQuery}`)
            }, 5000);

            const release = (err) => {
                // call the actual 'done' method, returning this client to the pool
                done(err)
                    // clear our timeout
                clearTimeout(timeout)
                    // set the query method back to its old un-monkey-patched version
                client.query = query
            };

            callback(err, client, done);
        });
    }
}