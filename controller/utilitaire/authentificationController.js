const express = require('express');
const router = express.Router();
const authentificationDB = require('../../db/authentificationDB');

/*
 ** Affichage de la page de login
 */
router.get('/login', function(request, response) {
    response.render('utilitaire/authentification/login', {
        layout: 'publicTemplate'
    });
});

/*
 ** Permet de ce déconnecter et de retourner à l'index
 */
router.get('/logout', function(request, response) {
    request.session.connecte = false;
    request.session.userConnected = {};

    response.redirect('./');
});

/*
 ** Soumission de la demande de connexion
 */
router.post('/login', function(request, response) {

    authentificationDB.isValidMember(request.body.email, request.body.motPasse, (membre) => {

        if (typeof membre !== 'undefined' && membre != null) {
            // request.session.connecte = request.body.motPasse === process.env.PASSWD_WEB;
            request.session.connecte = true;
            request.session.userConnected = membre;

            response.redirect('/');
        } else  {
            response.render('utilitaire/authentification/login', {
                layout: 'publicTemplate',
                datas: {
                    erreur: 'Adresse courriel ou mot de passe invalide.'
                }
            });
        }
    });
});

module.exports = router;