const express = require('express');
const router = express.Router();

const activiteDB = require('../../../db/ficheInscriptionDB')

router.get('/activite/gerer/:id', function(request, response) {
    const id = parseInt(request.params.id);

    activiteDB.getActiviteByNumeroSequence(id, (activite) => {
        response.render('activite/ficheInscription/fiche', activite);
    });
});

router.get('/activites', function(request, response) {
    //TODO: Obtenir les données des activités via un service web du wordpress du club
    activiteDB.getActivites((activites) => {
        response.render('activite/activites', {
            activites: activites
        });
    });
});


module.exports = router;