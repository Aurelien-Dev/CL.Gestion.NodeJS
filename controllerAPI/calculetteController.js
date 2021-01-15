const express = require('express');
const session = require('express-session');
var configEnum = require('../configs/enumerations.json');
const typeAdhesionDB = require('../db/typeAdhesionDB');
const router = express.Router();
const async = require('async');
const { getMaxListeners } = require('../app');

router.post('/api/calculette/participant', function(request, response) {
    console.log(request.body.nom);
    request.session.maliste.push({nom: request.body.nom, montant: 0});
    request.session.listeDepenses.forEach(function (item, index) {
        if(item.participants === undefined)
        {
            var tableau = []
            item.participants = tableau;
        }
        item.participants.push(true);
    });   
    reCalculerRepartition(request.session.maliste, request.session.listeDepenses);
    response.status(200).json({ success: true });
});

router.post('/api/calculette/depense', function(request, response) {

    if (request.body.participants != undefined) {

        request.body.participants.forEach(function (item, index) { 
            if(request.body.participants[index] === 'true') {request.body.participants[index] = true;} else {request.body.participants[index] = false;}
    })}

    request.session.listeDepenses.push(request.body);
    reCalculerRepartition(request.session.maliste, request.session.listeDepenses);
    response.status(200).json({ success: true });
});

router.put('/api/calculette/depense/:id', function (request, response) {

    if (request.body.participants != undefined) {

        request.body.participants.forEach(function (item, index) { 
            if(request.body.participants[index] === 'true') {request.body.participants[index] = true;} else {request.body.participants[index] = false;}
    })}

    request.session.listeDepenses[request.params.id] = request.body;
    reCalculerRepartition(request.session.maliste, request.session.listeDepenses);
    response.status(200).json({ success: true });   
})

router.delete('/api/calculette/participant/:id', function(request, response) {

    request.session.listeDepenses.forEach(function (item, index) {
        item.participants.splice(request.params.id,1);
    });
    request.session.maliste.splice(request.params.id,1);
    reCalculerRepartition(request.session.maliste, request.session.listeDepenses);

    response.status(200).json({ success: true });
});

router.delete('/api/calculette/depense/:id', function(request, response) {

    request.session.listeDepenses.splice(request.params.id,1);
    reCalculerRepartition(request.session.maliste, request.session.listeDepenses);

    response.status(200).json({ success: true });
});

module.exports = router;

function reCalculerRepartition (participants, depenses) {
    participants.forEach(function (item,index) {
        item.montant = 0;
    })

    depenses.forEach(function (item,index){

        if(item.participants != undefined) {
            nb_payeur = 0;
            item.participants.forEach(function (item, index) {
               if(item) {nb_payeur ++;}
            })

            item.participants.forEach(function (participant, indexp) {
                console.log(item);
                if (participant) {participants[indexp].montant = participants[indexp].montant + item.montant / nb_payeur;}
            })
        }
    })
}