const adhesionDB = require('../db/adhesionDB')
const express = require('express');
const router = express.Router();


/**
 * Permet d'obtenir les adhésions d'un membre
 * @param {int} id Correspond à l'identifiant du membre
 */
router.get('/api/adhesion/:id', function(request, response) {
    const id = parseInt(request.params.id);

    adhesionDB.getAdhesionByNumeroSequenceMembre(id, (infoAdhesionMembre) => {
        response.status(200).json({ data: infoAdhesionMembre });
    });
});


/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 * @param {int} id Correspond à l'identifiant du membre
 */
router.post('/api/adhesion/:id', function(request, response) {

    adhesionDB.createAdhesion(request.body, (results) => {
        response.status(200).json({ success: true });
    });
});

module.exports = router;