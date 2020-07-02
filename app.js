/// <reference path="./typings/node/node.d.ts" />
/// <reference path="./typings/express/express.d.ts" />
/// <reference path="./typings/express-handlebars/express-handlebars.d.ts" />

//Définition dse modules
var express = require('express');
var utils = require('./utils/utils.js');
var expressHandle = require('express-handlebars');
var bodyParser = require('body-parser');

var app = module.exports = express();
app.set('port', process.env.PORT || 3000);

var hbs = expressHandle.create({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main',
    helpers: utils.helpers.helpers
});

//définition du moteur de rendu (ici handlebars)
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//Ouverture d'un dossier public
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var apiController = require('./controller/api');
app.use(apiController);

var homeController = require('./controller/home');
app.use(homeController);

//Création sur serveur web
var serveur = app.listen(process.env.PORT || 3000, function() {
    console.log(new Date().toLocaleString() + ' - Server web started on port ' + app.get('port'));
});