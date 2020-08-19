const db = require('../db/baseDB');

const getMembresAutoComplete = (callback) => {
    var sql = `select numero_sequence,
                      nom || ' ' || prenom as nom_prenom
                 from public.membre
                where (est_supprime is null or est_supprime = false)`;

    db.query(sql, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getCompteurs = (callback) => {
    db.query(`select (select count(*) from membre m2 ) as count_membres, 
                     (select count(*) from formulaire_risque fr where fr.numero_sequence_membre  is null) as count_formulaire`, (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows[0]);
    });
};

module.exports = {
    getMembresAutoComplete,
    getCompteurs
};