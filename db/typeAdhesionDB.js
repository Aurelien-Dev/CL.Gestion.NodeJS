const db = require('../db/baseDB');
const moment = require('moment');

const getTypeAdhesion = (callback) => {
    db.query(`select numero_sequence,
                     nom,
                     to_char(date_debut, 'YYYY-MM-DD') as date_debut,
                     to_char(date_fin, 'YYYY-MM-DD') as date_fin,
                     nombre_jour,
                     montant,
                     montant_etudiant
                from public.type_adhesion`, [], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};


module.exports = {
    getTypeAdhesion,
};