const express = require('express');
const router = express.Router();

const activiteDB = require('../db/activiteDB')

router.get('/activite/gerer/:id', function(request, response) {
    const id = parseInt(request.params.id);

    activiteDB.getActiviteByNumeroSequence(id, (activite) => {
        response.render('activite/gestion-activite', activite);
    });
});

router.get('/activites', function(request, response) {
    activiteDB.getActivites((activites) => {
        response.render('activite/activites', {
            activites: activites
        });
    });
});


module.exports = router;