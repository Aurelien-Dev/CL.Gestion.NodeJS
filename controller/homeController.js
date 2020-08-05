const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const membreDB = require('../db/membreDB');
const router = express.Router();
const async = require('async');



/*
 ** Affichage de la page des formulaires en attente
 */
router.get('/home/formulaires', AfficherFormulaires);
router.get('/', AfficherFormulaires);

function AfficherFormulaires(request, response) {
    formulaireDB.getFormulairesNonAssocie((formulaires) => {
        response.render('home/formulaires', {
            formulaires: formulaires
        });
    });
}

/*
 ** Affichage de la page des membres
 */
router.get('/home/membres', function(request, response) {
    membreDB.getMembres((membres) => {
        response.render('home/membres', {
            membres: membres
        });
    });
});


module.exports = router;