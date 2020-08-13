//Définition dse modules
const express = require('express');
const utils = require('./utils/utilitaires.js');
const expressHandle = require('express-handlebars');
const bodyParser = require('body-parser');
const helper = require('./utils/helperscomponents.js');
var path = require('path');

var app = module.exports = express();
app.set('port', process.env.PORT || 3001);

var hbs = expressHandle.create({
    layoutsDir: 'views/layout/',
    defaultLayout: 'main',
    helpers: utils.helpers
});

//définition du moteur de rendu (ici handlebars)
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.set('view', path.join(__dirname, "views"));

//Ouverture d'un dossier public
app.use(express.static('public/'));
app.use(bodyParser.urlencoded({
    extended: true
}));

var formulaireApi = require('./controllerAPI/formulaireController');
app.use(formulaireApi);
var membreApi = require('./controllerAPI/membreController');
app.use(membreApi);
var configurationApi = require('./controllerAPI/configurationController');
app.use(configurationApi);
var adhesionApi = require('./controllerAPI/adhesionController');
app.use(adhesionApi);


var formulaireController = require('./controller/formulaireController');
app.use(formulaireController);
var membreController = require('./controller/membreController');
app.use(membreController);

var homeController = require('./controller/homeController');
app.use(homeController);




//Création sur serveur web
var serveur = app.listen(process.env.PORT || 3001, function() {
    console.log(new Date().toLocaleString() + ' - Server web started on port http://127.0.0.1:' + app.get('port'));
});