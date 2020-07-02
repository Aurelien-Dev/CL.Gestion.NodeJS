/// <reference path="../typings/express/express.d.ts" />

var express = require('express');
var router = express.Router();


/*
** Route principal lorsque l'on a besoin d'afficher la page de maintenance
*/
router.get('/', function (request, response) {
    //Render la page de maintenance sans moteur de rendu (layout:false)
    response.render('maintenance', { layout: false });
});


module.exports = router;