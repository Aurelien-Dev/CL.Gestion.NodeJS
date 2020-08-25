const express = require('express');


function ConrigurationControllers(app) {


    var formulaireApi = require('../controllerAPI/formulaireController');
    app.use(formulaireApi);
    var membreApi = require('../controllerAPI/membreController');
    app.use(membreApi);
    var configurationApi = require('../controllerAPI/configurationController');
    app.use(configurationApi);
    var adhesionApi = require('../controllerAPI/adhesionController');
    app.use(adhesionApi);
    var utilitaireAPI = require('../controllerAPI/utilitaireController');
    app.use(utilitaireAPI);


    var authentificationController = require('../controller/authentificationController');
    app.use(authentificationController);

    var middlewareBase = require('../controller/middlewareBase');
    app.use(middlewareBase);

    var formulaireController = require('../controller/formulaireController');
    app.use(formulaireController);
    var membreController = require('../controller/membreController');
    app.use(membreController);
    var homeController = require('../controller/homeController');
    app.use(homeController);
}

module.exports = { config: ConrigurationControllers };