const formulaireDB = require('../db/formulaireDB')
const mappers = require('../mappers/submitFormulaireMapper.js');
const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page d'accueil qui est le tableau de bord
 */
router.get('/', function(request, response) {
    formulaireDB.getFormulaires((formulaires) => {
        response.render('home/tableauBord', { frm: formulaires });
    });
});


module.exports = router;