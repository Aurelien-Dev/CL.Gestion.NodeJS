const db = require('../db/baseDB');
const { result } = require('underscore');

const getFormulaires = (callback) => {
    db.query(`select * 
                from public.formulaire_risque`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulairesNonAssocie = (callback) => {
    db.query(`select * 
                from public.formulaire_risque 
               where numero_sequence_membre is null`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulaireByNumeroSequence = (id, callback) => {
    db.query(`select * 
                from public.formulaire_risque 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};


const createFormulaire = (datas, callback) => {
    var donnees = [
        datas.nom,
        datas.prenom,
        datas.adresse_courriel,
        datas.telephone,
        datas.nom_prenom_contact,
        datas.adresse_contact,
        datas.telephone_contact,
        datas.lien_contact,
        (datas.accepte_risque != undefined ? true : false)
    ];

    db.query(`insert into public.formulaire_risque 
                     (nom, prenom, adresse_courriel, telephone, nom_prenom_contact, adresse_contact, telephone_contact, lien_contact, accepte_risque)
              values     
                     ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, donnees,
        (error, results) => {
            if (error) {
                return next(error);
            }
            callback(results.rows);
        });
};

const deleteFormulaireByNumeroSequence = (id, callback) => {
    db.query(`delete 
                from public.formulaire_risque 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const associeMembre = (numSeqFormulaire, numSeqMembre, callback) => {
    db.query(`update public.formulaire_risque 
                 set numero_sequence_membre = $2 
               where numero_sequence = $1`, [numSeqFormulaire, numSeqMembre], (error, results) => {
        if (error) {
            return next(error);
        }
        callback();
    });
};

module.exports = {
    getFormulaires,
    getFormulairesNonAssocie,
    getFormulaireByNumeroSequence,
    createFormulaire,
    deleteFormulaireByNumeroSequence,
    associeMembre
};