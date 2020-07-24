const formulaireDB = require('../db/formulaireDB')
const mappers = require('../mappers/submitFormulaireMapper.js');
const express = require('express');
const router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/', function(request, response) {
    formulaireDB.getFormulaires((formulaires) => {
        response.render('home/tableauBord', { formulaires: formulaires });
    });
});


module.exports = router;