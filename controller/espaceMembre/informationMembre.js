const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page de login
 */
router.get('/membre/information', function(request, response) {
    response.render('***', {
        layout: '***'
    });
});