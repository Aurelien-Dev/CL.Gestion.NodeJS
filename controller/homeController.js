const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const config = require('../configs/enumerations.json')

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
        membres.forEach(membre => {
            membre.role_libelle = config.ROLE[membre.role];
        });

        response.render('home/membres', {
            membres: membres
        });
    });
});

/*
 ** Affichage de la calculette
 */
router.get('/home/calculette', function(request, response) {
    console.log('je suis dans la calculette!');
    console.log(request.session.maliste);

    if (typeof request.session.maliste == 'undefined')
    {
        request.session.maliste = [];
        console.log('je reset!');
    }
    if (typeof request.session.listeDepenses == 'undefined')
    {
        request.session.listeDepenses = [];
    }
    
    
        response.render('home/calculette',
            {membres: request.session.maliste,
            depenses: request.session.listeDepenses});

});
module.exports = router;