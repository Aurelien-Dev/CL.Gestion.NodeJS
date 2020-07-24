const mappers = require('../mappers/submitFormulaireMapper.js');
const express = require('express');
const router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/', function(request, response) {
    response.render('Home/tableauBord');
});


module.exports = router;