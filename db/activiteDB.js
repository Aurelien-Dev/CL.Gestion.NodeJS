const db = require('../db/baseDB');

const getActiviteByNumeroSequence = (id, callback) => {
    db.query(`select * from public.activite where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows[0]);
    });
};

module.exports = {
    getActiviteByNumeroSequence
};