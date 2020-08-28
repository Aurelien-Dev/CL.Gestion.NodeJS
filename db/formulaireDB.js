const db = require('../db/baseDB');
const { result } = require('underscore');
const moment = require('moment');

const getFormulaires = (callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     nom_prenom_contact, 
                     adresse_contact, 
                     telephone_contact, 
                     lien_contact, 
                     accepte_risque, 
                     to_char(date_acceptation, 'YYYY-MM-DD') as date_acceptation,
                     to_char(date_expiration, 'YYYY-MM-DD') as date_expiration
                from public.formulaire_risque`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulairesNonAssocie = (callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     nom_prenom_contact, 
                     adresse_contact, 
                     telephone_contact, 
                     lien_contact, 
                     accepte_risque, 
                     to_char(date_acceptation, 'YYYY-MM-DD') as date_acceptation,
                     to_char(date_expiration, 'YYYY-MM-DD') as date_expiration
                from public.formulaire_risque 
               where numero_sequence_membre is null`, [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulaireByNumeroSequence = (id, callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     nom_prenom_contact, 
                     adresse_contact, 
                     telephone_contact, 
                     lien_contact, 
                     accepte_risque, 
                     to_char(date_acceptation, 'YYYY-MM-DD') as date_acceptation,
                     to_char(date_expiration, 'YYYY-MM-DD') as date_expiration
                from public.formulaire_risque 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};

const getFormulaireByNumeroSequenceMembre = (id, callback) => {
    db.query(`select numero_sequence,
                     nom, 
                     prenom, 
                     adresse_courriel, 
                     telephone, 
                     nom_prenom_contact, 
                     adresse_contact, 
                     telephone_contact, 
                     lien_contact, 
                     accepte_risque, 
                     to_char(date_acceptation, 'YYYY-MM-DD') as date_acceptation,
                     to_char(date_expiration, 'YYYY-MM-DD') as date_expiration
                from public.formulaire_risque 
               where numero_sequence_membre = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};


const createFormulaire = (datas, callback) => {
    var donnees = [
        datas.nom.trim(),
        datas.prenom.trim(),
        datas.adresse_courriel.trim().toLowerCase(),
        datas.telephone.trim(),
        datas.nom_prenom_contact.trim(),
        datas.adresse_contact.trim(),
        datas.telephone_contact.trim(),
        datas.lien_contact.trim(),
        (datas.accepte_risque != undefined ? true : false),
        moment().format('l'),
        moment().add(1, 'y')
    ];

    db.query(`insert into public.formulaire_risque 
                     (nom, prenom, adresse_courriel, telephone, 
                      nom_prenom_contact, adresse_contact, telephone_contact, 
                      lien_contact, accepte_risque, date_acceptation, date_expiration)
              values     
                     ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
              returning numero_sequence`, donnees,
        (error, results) => {
            if (error) {
                throw error;
            }
            callback(results.rows);
        });
};

const deleteFormulaireByNumeroSequence = (id, callback) => {
    db.query(`delete 
                from public.formulaire_risque 
               where numero_sequence = $1`, [id], (error, results) => {
        if (error) {
            throw error;
        }
        callback(results.rows);
    });
};

const associeMembre = (numSeqFormulaire, numSeqMembre, callback) => {
    db.query(`update public.formulaire_risque 
                 set numero_sequence_membre = $2 
               where numero_sequence = $1`, [numSeqFormulaire, numSeqMembre], (error, results) => {
        if (error) {
            throw error;
        }
        callback();
    });
};

const dissocierMembre = (numSeqFormulaire, callback) => {
    db.query(`update public.formulaire_risque 
                 set numero_sequence_membre = null 
               where numero_sequence = $1`, [numSeqFormulaire], (error, results) => {
        if (error) {
            throw error;
        }
        callback();
    });
};

module.exports = {
    getFormulaires,
    getFormulairesNonAssocie,
    getFormulaireByNumeroSequence,
    getFormulaireByNumeroSequenceMembre,
    createFormulaire,
    deleteFormulaireByNumeroSequence,
    associeMembre,
    dissocierMembre
};