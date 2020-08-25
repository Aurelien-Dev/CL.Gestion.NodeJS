//Définition dse modules
const express = require('express');
const nocache = require('nocache');

const helper = require('./utils/helperscomponents.js');
const configs = require('./config');
const configRendu = require('./configs/configMoteurRendu');
const configSession = require('./configs/configSession');
const configControllers = require('./configs/configControllers');

const router = express.Router();
var app = module.exports = express();

app.set('port', process.env.PORT || 3001);

app.use(nocache());

configRendu.config(app);
configSession.config(app);
configControllers.config(app);

//Création sur serveur web
var serveur = app.listen(process.env.PORT || 3001, function() {
    console.log(new Date().toLocaleString() + ' - Server web started on port http://127.0.0.1:' + app.get('port'));
});