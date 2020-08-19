const db = require('../db/baseDB');
const moment = require('moment');

const getMembres = (callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone,
                     role,
                     to_char(date_creation, 'YYYY-MM-DD') as date_creation,
                     est_supprime
                from public.membre
               where (est_supprime is null or est_supprime = false)`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

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

const getMembreByNumeroSequence = (id, callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     role,
                     to_char(date_creation, 'YYYY-MM-DD') as date_creation,
                     est_supprime
                from public.membre 
               where numero_sequence = $1
                 and (est_supprime is null or est_supprime = false)`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const createMembre = (datas, callback) => {
    var donnees = [
        datas.nom.trim(),
        datas.prenom.trim(),
        datas.adresse_courriel.trim().toLowerCase(),
        datas.telephone.trim(),
        moment().format('l'),
        false
    ];

    db.query(`insert into public.membre 
                     (nom, prenom, adresse_courriel, telephone, date_creation, est_supprime)
              values     
                     ($1, $2, $3, $4, $5, $6) 
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


const desactivationMembreByNumeroSequence = (id, callback) => {
    db.query(`update public.membre 
                set est_supprime = true 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

module.exports = {
    getMembres,
    getMembresAutoComplete,
    getMembreByNumeroSequence,
    createMembre,
    modifierRoleMembre,
    desactivationMembreByNumeroSequence
};