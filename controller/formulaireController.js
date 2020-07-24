const mappers = require('../mappers/submitFormulaireMapper.js');
const express = require('express');
const router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/formulaire', function(request, response) {
    response.render('Home/formulaire');
});

/*
 ** Affichage d'accueil
 */
router.post('/EnregistrerFormulaireInterne', function(request, response) {
    var renseignementFormulaire = mappers.formulaire.mapperBody(request.body);

    //Procéder a l'enregistrement des données

    response.render('Home/formulaire');
});

module.exports = router;