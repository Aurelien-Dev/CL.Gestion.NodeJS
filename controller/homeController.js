var mappers = require('../mappers/submitFormulaireMapper.js');
var config = require('../config.js');
var express = require('express');
var router = express.Router();

/*
 ** Affichage d'accueil
 */
router.get('/', function(request, response) {
    response.render('Home/home');
});


module.exports = router;