const utilitaireDB = require('../db/utilitaireDB');

const express = require('express');
const router = express.Router();
const _ = require('underscore');

/**
 * Middleware permettant d'ajouter les informations de compteur automatiquement au changement de la page
 * 
 * Aide utilisé :
 * https://stackoverflow.com/questions/9285880/node-js-express-js-how-to-override-intercept-res-render-function
 * @param {object} req Request
 * @param {Object} res Response
 * @param {callback} next Passage au middleware suivant
 */
function middlewareObtentionCompteur(req, res, next) {
    utilitaireDB.getCompteurs((compteur) => {
        // grab reference of render
        var _render = res.render;
        // override logic
        res.render = function(view, options, fn) {
            if (typeof options === 'undefined') options = {}

            // do some custom logic
            _.extend(options, { compteur: compteur });
            // continue with original render
            _render.call(this, view, options, fn);
        }
        next();
    });
}


module.exports = [
    middlewareObtentionCompteur
];