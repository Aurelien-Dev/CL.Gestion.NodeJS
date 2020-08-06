const express = require('express');
var configEnum = require('../configs/enumerations.json');
const typeAdhesionDB = require('../db/typeAdhesionDB');
const router = express.Router();
const async = require('async');

router.get('/api/configuration', function(request, response) {
    async.waterfall([
        function(callback) {
            typeAdhesionDB.getTypeAdhesion((resultat) => {
                callback(null, resultat);
            });
        }
    ], function(err, typeAdhesion) {
        var configurationGlobal = {
            Enums: configEnum,
            TypeAdhesion: typeAdhesion
        };
        response.json(configurationGlobal);
    });
});

module.exports = router;