const { Pool } = require('pg');

//TODO: odifier la section pour ajouter des variables d'environement
const pool = new Pool({
    user: 'xtrtdlyjfpawxm',
    host: 'ec2-54-247-103-43.eu-west-1.compute.amazonaws.com',
    database: 'd9rl40ucgr7bta',
    password: '508417421874049ce26fc0a24d4324e885c6a577cb7279403695741be57cef0b',
    port: 5432,
    ssl: { rejectUnauthorized: false }
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