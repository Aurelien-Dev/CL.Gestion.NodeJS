const db = require('../db/baseDB');
const mapper = require('../mappers/submitFormulaireMapper');
const { result } = require('underscore');

const getFormulaires = (callback) => {
    db.query('select * from public.formulaire_risque', [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulaireByNumeroSequence = (id, callback) => {

    db.query('select * from public.formulaire_risque where numero_sequence = $1', [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const createFormulaire = (datas, callback) => {
    var donnees = [
        datas.Nom,
        datas.Prenom,
        datas.AdresseCourriel,
        datas.Telephone,
        datas.NomPrenomContact,
        datas.AdresseContact,
        datas.TelephoneContact,
        datas.LienContact,
        (datas.AccepteRisque != undefined ? true : false)
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

    db.query('delete from public.formulaire_risque where numero_sequence = $1', [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};
module.exports = {
    getFormulaires,
    getFormulaireByNumeroSequence,
    createFormulaire,
    deleteFormulaireByNumeroSequence
};