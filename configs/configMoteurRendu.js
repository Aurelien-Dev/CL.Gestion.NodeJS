const expressHandle = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');

const utils = require('../utils/utilitaires.js');

function ConrigurationRendu(app) {
    var hbs = expressHandle.create({
        layoutsDir: 'views/layout/',
        defaultLayout: 'templateBase',
        helpers: utils.helpers
    });

    //définition du moteur de rendu (ici handlebars)
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');

    //Ouverture d'un dossier public
    app.use(express.static('public/'));
    app.use(bodyParser.urlencoded({
        extended: true
    }));
}

module.exports = { config: ConrigurationRendu }