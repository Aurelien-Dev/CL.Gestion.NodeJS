const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const membreDB = require('../db/membreDB');
const router = express.Router();
const async = require('async');
/*
 ** Affichage de la page d'accueil qui est le tableau de bord
 */
router.get('/', function(request, response) {
    async.waterfall([
        function(callback) {
            formulaireDB.getFormulairesNonAssocie((formulaires) => {
                // since we did not return, this callback still will be called and
                // `processData` will be called twice
                callback(null, formulaires);
            });
        },
        function(formulaires, callback) {
            membreDB.getMembres((membres) => {
                // since we did not return, this callback still will be called and
                // `processData` will be called twice
                callback(null, formulaires, membres);
            });
        }
    ], function(err, formulaires, membres) {
        response.render('home/tableauBord', {
            formulaires: formulaires,
            membres: membres
        });
    })


    formulaireDB.getFormulairesNonAssocie((formulaires) => {

    });
});


module.exports = router;