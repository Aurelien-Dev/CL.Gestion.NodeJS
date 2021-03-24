const expressHandle = require('express-handlebars');
const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');

const utils = require('../utils/utilitaires.js');

/**
 * Configuration du moteur de rendu, ici handlebars et expressjs
 * @param {Object} app Application web
 */
function ConrigurationRendu(app) {
    var hbs = expressHandle.create({
        layoutsDir: 'views/layout/',
        defaultLayout: 'template',
        helpers: {
            _toInt: (str) => {
                return parseInt(str, 10);
            },
            _year: (date) => {
                return moment(date).year();
            }
        }
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