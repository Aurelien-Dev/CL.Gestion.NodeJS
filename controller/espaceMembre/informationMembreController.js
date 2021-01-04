const express = require('express');
const async = require('async');

const formulaireDB = require('../../db/formulaireDB');
const membreDB = require('../../db/membreDB');
const adhesionDB = require('../../db/adhesionDB');
const router = express.Router();

/*
 ** Affichage de la page de login
 */
router.get('/mon-espace', function(request, response) {

    var id = 13;
    async.waterfall([
        //Obtention des informations du membre
        (callback) => {
            membreDB.getMembreByNumeroSequence(id, (infoMembre) => {
                callback(null, infoMembre);
            });
        },
        //Obtention de ces formulaires de risques
        (infoMembre, callback) => {
            formulaireDB.getFormulaireActifByNumeroSequenceMembre(id, (infoFormulairesMembre) => {
                callback(null, infoMembre, infoFormulairesMembre);
            });
        },
        //Obtention de ces formulaires de risques
        (infoMembre, infoFormulairesMembre, callback) => {
            adhesionDB.getAdhesionByNumeroSequenceMembre(id, (infoAdhesionsMembre) => {
                callback(null, infoMembre, infoFormulairesMembre, infoAdhesionsMembre);
            });
        }
    ], (err, infoMembre, infoFormulairesMembre, infoAdhesionsMembre) => {
        if (typeof err != 'undefined') {
            response.status(500);
        }

        if (infoMembre.length == 1) {
            response.render('espaceMembre/espace-personnel', {
                layout: 'template-membre',
                membre: infoMembre[0],
                formulaire: infoFormulairesMembre[0],
                adhesions: infoAdhesionsMembre
            });
        } else {
            response.redirect('./');
        }
    });
});


module.exports = router;