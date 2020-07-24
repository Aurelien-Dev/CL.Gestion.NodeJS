//Définition dse modules
var express = require('express');
var utils = require('./utils/utils.js');
var expressHandle = require('express-handlebars');
var bodyParser = require('body-parser');
var helper = require('./utils/helperscomponents.js');

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

var apiController = require('./controllerAPI/formulaireController');
app.use(apiController);

var formulaireController = require('./controller/formulaireController');
app.use(formulaireController);

var homeController = require('./controller/homeController');
app.use(homeController);

//Création sur serveur web
var serveur = app.listen(process.env.PORT || 3001, function() {
    console.log(new Date().toLocaleString() + ' - Server web started on port http://127.0.0.1:' + app.get('port'));
});