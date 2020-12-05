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
            throw error;
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
            throw error;
        }
        callback(results.rows);
    });
};

const getInformationCarteMembre = (idMembre, idAdhesion, callback) => {
    db.query(`select m.nom || ' ' || m.prenom as nom_prenom,
                     to_char(a.date_debut, 'YYYY-MM-DD') as date_debut,
                     to_char(a.date_debut, 'YYYY') as annee_debut,
                     to_char(a.date_fin, 'YYYY-MM-DD') as date_fin,
                     a.numero_membre,
                     ta.nom as type_carte,
                     ta.adresse_carte as url_carte
                from membre m
               inner join adhesion a ON m.numero_sequence = a.numero_sequence_membre and a.numero_sequence = $2
               inner join type_adhesion ta on a.numero_sequence_type_adhesion = ta.numero_sequence
               where m.numero_sequence = $1`, [idMembre, idAdhesion], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows[0]);
    });
};

const createMembre = (datas, callback) => {
    var donnees = [
        datas.nom.trim(),
        datas.prenom.trim(),
        'password',
        datas.adresse_courriel.trim().toLowerCase(),
        datas.telephone.trim(),
        moment().format('l'),
        false
    ];

    db.query(`insert into public.membre 
                     (nom, prenom, passhash, adresse_courriel, telephone, date_creation, est_supprime)
              values     
                     ($1, $2, $3, $4, $5, $6, $7) 
           returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                throw error;
            }
            callback(results.rows[0].numero_sequence);
        });
};



const modifierRoleMembre = (id, role, callback) => {
    db.query(`update public.membre
                 set role = $2
               where numero_sequence = $1`, [id, role], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};


const desactivationMembreByNumeroSequence = (id, callback) => {
    db.query(`update public.membre 
                set est_supprime = true 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};




module.exports = {
    getMembres,
    getMembreByNumeroSequence,
    getInformationCarteMembre,
    createMembre,
    modifierRoleMembre,
    desactivationMembreByNumeroSequence
};