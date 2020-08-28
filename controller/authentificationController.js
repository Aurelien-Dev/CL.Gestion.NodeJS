const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page de login
 */
router.get('/login', function(request, response) {
    response.render('authentification/login', {
        layout: 'publicTemplate'
    });
});

/*
 ** Permet de ce déconnecter et de retourner à l'index
 */
router.get('/logout', function(request, response) {
    request.session.connecte = false;
    response.redirect('./');

});

/*
 ** Soumission de la demande de connexion
 */
router.post('/login', function(request, response) {

    request.session.connecte = request.body.motPasse === process.env.PASSWD_WEB;
    response.redirect('./');
});

module.exports = router;