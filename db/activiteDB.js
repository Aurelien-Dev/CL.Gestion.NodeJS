const db = require('../db/baseDB');

const getActivites = (callback) => {
    db.query(`select numero_sequence,
                     nom,
                     description,
                     difficulte,
                     volet,
                     to_char(date_heure_debut, 'YYYY-MM-DD HH24hMI') as date_heure_debut,
                     to_char(date_heure_fin, 'YYYY-MM-DD HH24hMI') as date_heure_fin
                from public.activite`, (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getActiviteByNumeroSequence = (id, callback) => {
    db.query(`select numero_sequence,
                     nom,
                     description,
                     difficulte,
                     volet,
                     to_char(date_heure_debut, 'YYYY-MM-DD HH24hMI') as date_heure_debut,
                     to_char(date_heure_fin, 'YYYY-MM-DD HH24hMI') as date_heure_fin
                from public.activite
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