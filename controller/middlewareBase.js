const utilitaireDB = require('../db/utilitaireDB');

const express = require('express');
const router = express.Router();
const _ = require('underscore');


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