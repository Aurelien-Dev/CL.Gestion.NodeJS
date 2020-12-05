/**
 * Méthode de configuration des controlleurs
 * L'ordre de référencement est important par rapport aux middlewares
 * @param {Object} app Application web
 */
function ConrigurationControllers(app) {
    //Controlleurs de la WebAPI
    var formulaireApi = require('../controllerAPI/formulaireController');
    var membreApi = require('../controllerAPI/membreController');
    var configurationApi = require('../controllerAPI/configurationController');
    var adhesionApi = require('../controllerAPI/adhesionController');
    var utilitaireAPI = require('../controllerAPI/utilitaireController');

    //Controlleurs de l'interface web
    var authentificationController = require('../controller/authentificationController');
    var formulaireController = require('../controller/formulaireController');
    var membreController = require('../controller/membreController');
    var homeController = require('../controller/homeController');
    var ficheInscriptionController = require('../controller/ficheInscriptionController');

    //Middleware
    var middlewareBase = require('../controller/middlewareBase');

    app.use(formulaireApi);
    app.use(membreApi);
    app.use(configurationApi);
    app.use(adhesionApi);
    app.use(utilitaireAPI);

    app.use(authentificationController);

    app.use(middlewareBase);

    app.use(formulaireController);
    app.use(membreController);
    app.use(homeController);
    app.use(ficheInscriptionController);
}

module.exports = { config: ConrigurationControllers };