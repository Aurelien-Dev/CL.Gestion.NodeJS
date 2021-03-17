const db = require('../db/baseDB');

const getMembresAutoComplete = (callback) => {
    var sql = `select numero_sequence,
                      nom || ' ' || prenom as nom_prenom
                 from public.membre
                where (est_supprime is null or est_supprime = false)`;

    db.query(sql, [], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};

const getCompteurs = (callback) => {
    db.query(`select (select count(*) from membre where est_supprime = false) as count_membres`, (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows[0]);
    });
};

module.exports = {
    getMembresAutoComplete,
    getCompteurs
};