const db = require('./baseDB');

const getActivites = (callback) => {
    db.query(`select numero_sequence,
                     nom_activite,
                     url
                from public.fiche_inscription`, (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getActiviteByNumeroSequence = (id, callback) => {
    db.query(`select numero_sequence,
                     nom_activite,
                     url
                from public.fiche_inscription
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows[0]);
    });
};

module.exports = {
    getActivites,
    getActiviteByNumeroSequence
};