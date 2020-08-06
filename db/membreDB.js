const db = require('../db/baseDB');
const moment = require('moment');

const getMembres = (callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone,
                     role,
                     to_char(date_creation, 'YYYY-MM-DD') as date_creation                     
                from public.membre`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getMembreByNumeroSequence = (id, callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     role,
                     to_char(date_creation, 'YYYY-MM-DD') as date_creation
                from public.membre 
               where numero_sequence = $1`, [id], (error, results) => {
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
        datas.telephone,
        moment().format('l')
    ];

    db.query(`insert into public.membre 
                     (nom, prenom, adresse_courriel, telephone, date_creation)
              values     
                     ($1, $2, $3, $4, $5) 
           returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                return next(error);
            }
            callback(results.rows[0].numero_sequence);
        });
};



const modifierRoleMembre = (id, role, callback) => {
    db.query(`update public.membre
                 set role = $2
               where numero_sequence = $1`, [id, role], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};


module.exports = {
    getMembres,
    getMembreByNumeroSequence,
    createMembre,
    modifierRoleMembre
};