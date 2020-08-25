const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page des formulaires en attente
 */
router.get('/login', function(request, response) {
    response.render('authentification/login', {
        layout: false
    });
});

/*
 ** Affichage de la page des formulaires en attente
 */
router.get('/logout', function(request, response) {
    request.session.connecte = false;
    response.redirect('./');

});

/*
 ** Affichage de la page des formulaires en attente
 */
router.post('/login', function(request, response) {
    request.session.connecte = true;
    response.redirect('./');
});

module.exports = router;