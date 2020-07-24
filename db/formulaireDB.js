const db = require('../db/baseDB');
const mapper = require('../mappers/submitFormulaireMapper');
const { result } = require('underscore');

const getFormulaires = (callback) => {
    db.query('select * from public."FormulaireRisque"', [], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const getFormulaireByNumeroSequence = (id, callback) => {

    db.query('select * from public."FormulaireRisque" where "numeroSequence" = $1', [id], (error, results) => {
        if (error) {
            return next(error);
        }
        callback(results.rows);
    });
};

const createFormulaire = (datas, callback) => {
    db.query(`insert into public."FormulaireRisque" 
               (nom, prenom, "adresseCourriel", 
                telephone, "nomPrenomContact", 
                "adresseContact", "telephoneContact", 
                "lienContact", "accepteRisque")
              values     
              ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, datas,
        (error, results) => {
            if (error) {
                return next(error);
            }
            callback(results.rows);
        });
};

module.exports = {
    getFormulaires,
    getFormulaireByNumeroSequence,
    createFormulaire
};