const express = require('express');
const async = require('async');

const membreDB = require('../../db/membreDB');

const router = express.Router();

/*
 ** Affichage de la page de login
 */
router.get('/inscription', function(request, response) {
    response.render('espaceMembre/inscription-membre', {
        layout: 'publicTemplate'
    });
});

/*
 ** Affichage de la page de login
 */
router.post('/inscription', function(request, response) {
    var membreInfo = {
        nom: request.body.nom.trim(),
        prenom: request.body.prenom.trim(),
        password: request.body.password.trim(),
        adresse_courriel: request.body.adresse_courriel.trim().toLowerCase(),
        telephone: request.body.telephone.trim(),
        date_naissance: request.body.date_naissance
    };

    membreDB.createMembre(membreInfo, () => {

        // var url = 'http://' + request.headers.host + '/login';
        response.redirect(301, './');

    });
});


module.exports = router;