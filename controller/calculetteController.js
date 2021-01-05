const express = require('express');
const router = express.Router();
const async = require('async');
var helpers = require('handlebars-helpers')();
const fs = require('fs');

const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB')
const typeAdhesionDB = require('../db/typeAdhesionDB');
const json = require('../configs/enumerations.json');
const utilitaires = require('../utils/utilitaires');
const service = require('../services/genererCarteMembre');

router.get('/calculette', function(request, response) {
    console.log('je suis dans la calculette!');
    console.log(request.session.maliste);

    if (typeof request.session.maliste == 'undefined')
    {
        request.session.maliste = [];
        console.log('je reset!');
    }
    if (typeof request.session.listeDepenses == 'undefined')
    {
        request.session.listeDepenses = [];
    }
    
    
        response.render('home/calculette',
            {membres: request.session.maliste,
            depenses: request.session.listeDepenses});

});

module.exports = router;