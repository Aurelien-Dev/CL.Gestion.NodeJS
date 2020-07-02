/// <reference path="../typings/express/express.d.ts" />
/// <reference path="../typings/underscore/underscore.d.ts" />


var express = require('express');
var router = express.Router();

/*
 * Permet d'obtenir le dernier débit d'une station
 */
router.post('/api/:idStation', function(request, response) {
    // infodebitService.obtenirDebitParStation(request.params.idStation, request.body.colonneIndex, function(result) {
    //     response.json({ success: true, result: result });
    // });
});



module.exports = router;