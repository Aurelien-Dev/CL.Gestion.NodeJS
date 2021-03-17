const formulaireDB = require('../../db/formulaireDB');
const express = require('express');
const router = express.Router();
const gererConnexion = require('../../services/gererConnexion');

/*
 ** Permet de consulter un formulaire existant, sinon retourne a la page d'accueil
 */
router.get('/formulaire/consulter', [gererConnexion.gererMembre, (request, response) => {
    const id = request.session.userConnected.formulaireRisqueActif.numero_sequence;

    formulaireDB.getFormulaireByNumeroSequence(id, (result) => {
        if (result.length == 1) {
            response.render('espaceMembre/formulaireRisque/formulaire-lecture', {
                layout: 'template-membre',
                formulaire: result[0]
            });
        } else {
            response.redirect('./');
        }
    });
}]);

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/formulaireRisque/ajouter', [gererConnexion.gererMembre, (request, response) => {
    var userConnected = request.session.userConnected;

    response.render('espaceMembre/formulaireRisque/formulaire-ajout', {
        layout: 'template-membre',
        numero_sequence: userConnected.numero_sequence,
        nom: userConnected.nom,
        prenom: userConnected.prenom,
        adresse_courriel: userConnected.adresse_courriel,
        telephone: userConnected.telephone
    });
}]);


/*
 ** Permet d'ajouter le formulaire 
 */
router.post('/formulaireRisque/ajouter', (request, response) => {
    formulaireDB.createFormulaire(request.body, (results) => {
        response.redirect('/');
    });
});


module.exports = router;