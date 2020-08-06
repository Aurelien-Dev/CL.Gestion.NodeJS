const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB')
const adhesionDB = require('../db/adhesionDB')
const express = require('express');
const router = express.Router();
const async = require('async');

/*
 ** Permet de consulter un formulaire existant, sinon retourne a la page d'accueil
 */
router.get('/membre/consulter/:id', function(request, response) {
    const id = parseInt(request.params.id);

    async.waterfall([
        //Obtention des informations du membre
        function(callback) {
            membreDB.getMembreByNumeroSequence(id, (infoMembre) => {
                callback(null, infoMembre);
            });
        },
        //Obtention de ces formulaires de risques
        function(infoMembre, callback) {
            formulaireDB.getFormulaireByNumeroSequenceMembre(id, (infoFormulairesMembre) => {
                callback(null, infoMembre, infoFormulairesMembre);
            });
        },
        //Obtention de ces formulaires de risques
        function(infoMembre, infoFormulairesMembre, callback) {
            adhesionDB.getAdhesionByNumeroSequenceMembre(id, (infoAdhesionMembre) => {
                callback(null, infoMembre, infoFormulairesMembre, infoAdhesionMembre);
            });
        }
    ], function(err, infoMembre, infoFormulairesMembre, infoAdhesionMembre) {
        if (infoMembre.length == 1) {
            response.render('membre/membre-lecture', {
                membre: infoMembre[0],
                formulaires: infoFormulairesMembre,
                adhesions: infoAdhesionMembre
            });
        } else {
            response.redirect('./');
        }
    });
});

module.exports = router;