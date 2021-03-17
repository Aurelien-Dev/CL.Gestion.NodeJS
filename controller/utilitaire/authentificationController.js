const express = require('express');
const async = require('async');
const router = express.Router();
const authentificationDB = require('../../db/authentificationDB');
const formulaireDB = require('../../db/formulaireDB');

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

    async.waterfall([
        //Obtention des information de l'utilisateur connecter 
        (callback) => {
            authentificationDB.isValidMember(request.body.email, request.body.motPasse, (membre) => {
                callback(null, membre);
            });
        },
        (infoMembreConnecte, callback) => {
            if (infoMembreConnecte === null || typeof infoMembreConnecte === 'undefined') {
                callback(null, null, null);
            } else {
                formulaireDB.getFormulaireActifByNumeroSequenceMembre(infoMembreConnecte.numero_sequence, (formulaire) => {
                    callback(null, infoMembreConnecte, formulaire);
                })
            }
        }
    ], (err, infoMembreConnecte, infoFormulaireRisque) => {
        if (infoMembreConnecte != null && typeof infoMembreConnecte !== 'undefined') {
            infoMembreConnecte.formulaireRisqueActif = infoFormulaireRisque;

            request.session.connecte = true;
            request.session.userConnected = infoMembreConnecte;

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