const mappers = require('../mappers/submitFormulaireMapper.js');
const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/formulaire', function(request, response) {
    response.render('/home/formulaire');
});

/*
 ** Affichage d'accueil
 */
router.post('/EnregistrerFormulaireInterne', function(request, response) {
    var renseignementFormulaire = mappers.formulaire.mapperBody(request.body);

    //Procéder a l'enregistrement des données
    formulaireDB.createFormulaire(renseignementFormulaire, (results) => {
        //response.render('Home/formulaire');
        response.redirect('./');
    });

});

module.exports = router;