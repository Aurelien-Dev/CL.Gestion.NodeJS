const express = require('express');
const router = express.Router();
const _ = require('underscore');

const utilitaireDB = require('../db/utilitaireDB');

/**
 * Middleware permettant de retirer l'indexation des robots
 * @param {object} request Request
 * @param {Object} response Response
 * @param {callback} next Passage au middleware suivant
 */
router.use(function(request, response, next) {
    response.header('X-Robots-Tag', 'noindex');
    //res.header('Cache-Control', 'no-store');
    next();
});


/**
 * Middleware permettant de rediriger vers la page d'authentification si la personne n'est pas connecté
 * @param {object} request Request
 * @param {Object} response Response
 * @param {callback} next Passage au middleware suivant
 */
router.use(function(request, response, next) {
    var url = 'http://' + request.headers.host + '/login';

    if ((process.env.NODE_ENV || 'dev') == 'dev') {
        request.session.connecte = true;
    }

    if (!request.session.connecte) {
        response.redirect(301, url)
    } else {
        next();
    }
});


/**
 * Middleware permettant d'ajouter les informations de compteur automatiquement au changement de la page
 * 
 * Aide utilisé :
 * https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
 * @param {object} request Request
 * @param {Object} response Response
 * @param {callback} next Passage au middleware suivant
 */
router.use(function(request, response, next) {
    utilitaireDB.getCompteurs((compteur) => {
        // grab reference of render
        var _render = response.render;
        // override logic
        response.render = function(view, options, fn) {
            if (typeof options === 'undefined') options = {}

            // do some custom logic
            _.extend(options, { compteur: compteur });
            // continue with original render
            _render.call(this, view, options, fn);
        }
        next();
    });
});



module.exports = router;