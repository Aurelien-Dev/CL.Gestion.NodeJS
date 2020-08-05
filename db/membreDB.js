const db = require('../db/baseDB');
const { result } = require('underscore');

const getMembres = (callback) => {
    db.query('select * from public.membre', [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getMembreByNumeroSequence = (id, callback) => {
    db.query('select * from public.membre where numero_sequence = $1', [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const createMembre = (datas, callback) => {
    var donnees = [
        datas.nom,
        datas.prenom,
        datas.adresse_courriel,
        datas.telephone
    ];

    db.query(`insert into public.membre 
                     (nom, prenom, adresse_courriel, telephone)
              values     
                     ($1, $2, $3, $4) 
           returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                return next(error);
            }
            callback(results.rows[0].numero_sequence);
        });
};

// const desactiverMembreByNumeroSequence = (id, callback) => {

//     db.query('update from public.formulaire_risque where numero_sequence = $1', [id], (error, results) => {
//         if (error) {
//             return next(error);
//         }
//         callback(results.rows);
//     });
// };


module.exports = {
    getMembres,
    getMembreByNumeroSequence,
    createMembre
    // deleteFormulaireByNumeroSequence
};