const utilitaireDB = require('../db/utilitaireDB')
const membreDB = require('../db/membreDB')
const express = require('express');
const router = express.Router();

/**
 * Permet de fournir les données pour l'autocompletion de la recherche de membres
 */
router.get('/api/utilitaire/membreAutocomplete', function(request, response) {

    utilitaireDB.getMembresAutoComplete((membres) => {
        var retour = {
            results: [],
            pagination: {
                more: false
            }
        };

        membres.forEach(membre => {
            retour.results.push({
                id: membre.numero_sequence,
                text: membre.nom_prenom
            });
        });

        response.json(retour);
    });
});


module.exports = router;