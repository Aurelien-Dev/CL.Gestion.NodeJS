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

module.exports = router;