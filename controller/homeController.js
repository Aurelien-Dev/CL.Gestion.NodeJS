const formulaireDB = require('../db/formulaireDB')
const mappers = require('../mappers/submitFormulaireMapper.js');
const express = require('express');
const router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/', function(request, response) {
    response.render('/app/views/home/tableau');

    // formulaireDB.getFormulaires((formulaires) => {
    //     response.render('home/tableau', { frm: formulaires });
    // });
});


module.exports = router;