const express = require('express');
const session = require('express-session');
var configEnum = require('../configs/enumerations.json');
const typeAdhesionDB = require('../db/typeAdhesionDB');
const router = express.Router();
const async = require('async');
const { getMaxListeners } = require('../app');

router.post('/api/calculette/participant', function(request, response) {
    console.log(request.body.nom);
    request.session.maliste.push({nom: request.body.nom});
    request.session.listeDepenses.forEach(function (item, index) {
        item.participants.push(true);
    });   
    response.status(200).json({ success: true });
});

router.post('/api/calculette/depense', function(request, response) {
    request.body.participants.forEach(function (item, index) { 
        if(request.body.participants[index] === 'true') {request.body.participants[index] = true;} else {request.body.participants[index] = false;}
    })
    console.log(request.body);
    request.session.listeDepenses.push(request.body);
    response.status(200).json({ success: true });
});

router.delete('/api/calculette/participant/:id', function(request, response) {

    request.session.listeDepenses.forEach(function (item, index) {
        item.participants.splice(request.params.id,1);
    });
    request.session.maliste.splice(request.params.id,1);

    response.status(200).json({ success: true });
});

router.delete('/api/calculette/depense/:id', function(request, response) {

    /*request.session.listeDepenses.forEach(function (item, index) {
        item.participants.splice(request.params.id,1);
    });*/
    request.session.listeDepenses.splice(request.params.id,1);

    response.status(200).json({ success: true });
});

module.exports = router;