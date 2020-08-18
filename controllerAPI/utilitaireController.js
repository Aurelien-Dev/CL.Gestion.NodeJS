const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB')
const express = require('express');
const { result } = require('underscore');
const router = express.Router();
const async = require('async');


/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 */
router.get('/api/utilitaire/membreAutocomplete', function(request, response) {

    membreDB.getMembresAutoComplete(request.query.term, (membres) => {
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