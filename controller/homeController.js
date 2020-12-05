const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB');
const express = require('express');
const router = express.Router();
const config = require('../configs/enumerations.json')


/*
 ** Affichage de la page des membres
 */
router.get('/', AfficherMembres);
router.get('/home/membres', AfficherMembres);

function AfficherMembres(request, response) {
    membreDB.getMembres((membres) => {
        membres.forEach(membre => {
            membre.role_libelle = config.ROLE[membre.role];
        });

        response.render('home/membres', {
            membres: membres
        });
    });
}

module.exports = router;