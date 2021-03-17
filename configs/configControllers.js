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
    var authentificationController = require('../controller/utilitaire/authentificationController');
    var formulaireRisqueController = require('../controller/espaceMembre/formulaireRisqueController');
    var informationMembreController = require('../controller/espaceMembre/informationMembreController');
    var inscriptionMembreController = require('../controller/espaceMembre/inscriptionMembreController');
    var membreController = require('../controller/administration/membreController');
    var listeController = require('../controller/administration/listeController');
    var inscriptionActiviteController = require('../controller/administration/activite/inscriptionActiviteController');
    var homeController = require('../controller/homeController');

    //Middleware
    var middlewareBase = require('../controller/utilitaire/middlewareBase');

    app.use(formulaireApi);
    app.use(membreApi);
    app.use(configurationApi);
    app.use(adhesionApi);
    app.use(utilitaireAPI);

    app.use(authentificationController);

    app.use(middlewareBase);

    app.use(homeController);
    app.use(formulaireRisqueController);
    app.use(informationMembreController);
    app.use(inscriptionMembreController);
    app.use(membreController);
    app.use(listeController);
    app.use(inscriptionActiviteController);
}

module.exports = { config: ConrigurationControllers };