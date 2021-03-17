const express = require('express');
const router = express.Router();
const _ = require('underscore');

const utilitaireDB = require('../../db/utilitaireDB');
const config = require('../../config');

/**
 * Middleware permettant de retirer l'indexation des robots
 * @param {object} request Request
 * @param {Object} response Response
 * @param {callback} next Passage au middleware suivant
 */
router.use(function(request, response, next) {
    response.header('X-Robots-Tag', 'noindex');
    next();
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
router.use((request, response, next) => {
    utilitaireDB.getCompteurs((compteur) => {
        // grab reference of render
        var _render = response.render;
        // override logic
        response.render = function(view, options, fn) {
            if (typeof options === 'undefined') options = {}

            // do some custom logic
            _.extend(options, { compteur: compteur, info_envir: config.INFO_ENVIR });
            // continue with original render
            _render.call(this, view, options, fn);
        }
        next();
    });
});



module.exports = router;