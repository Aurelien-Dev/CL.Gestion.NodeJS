const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page des membres
 */
router.get('/', AfficherMembres);

function AfficherMembres(request, response) {
    if (request.session.connecte) {
        if (request.session.userConnected.role === null || request.session.userConnected.role === '') {
            response.redirect('./mon-espace/');
        } else {
            response.redirect('./liste/membres/');
        }
    } else {
        response.redirect('./login/');
    }
}

module.exports = router;