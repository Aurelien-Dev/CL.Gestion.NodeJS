const adhesionDB = require('../db/adhesionDB')
const express = require('express');
const router = express.Router();
const config = require('../configs/enumerations.json')


/**
 * Permet d'obtenir les adhésions d'un membre
 * @param {int} id Correspond à l'identifiant du membre
 */
router.get('/api/adhesion/:id', function(request, response) {
    const id = parseInt(request.params.id);

    adhesionDB.getAdhesionByNumeroSequenceMembre(id, (infoAdhesionMembre) => {
        infoAdhesionMembre.forEach(adhesion => {
            adhesion.type_transaction_libelle = config.TYPE_TRANSAC[adhesion.type_transaction];
        });

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