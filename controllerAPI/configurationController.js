const express = require('express');
var configEnum = require('../configs/enumerations.json');
const router = express.Router();

/**
 * Permet l'ajout d'un nouveau formulaire d'accèptation dess risques
 * @param {*} id Correspond à l'identifiant du formulaire à utiliser pour créer un membre 
 */
router.get('/api/configuration', function(request, response) {
    response.json(configEnum);
});

module.exports = router;