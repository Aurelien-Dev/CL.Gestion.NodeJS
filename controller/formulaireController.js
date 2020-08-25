const formulaireDB = require('../db/formulaireDB');
const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/formulaire/ajouter', function(request, response) {
    response.render('formulaire/formulaire', {});
});


/*
 ** Permet de consulter un formulaire existant, sinon retourne a la page d'accueil
 */
router.get('/formulaire/consulter/:id', function(request, response) {
    const id = parseInt(request.params.id);

    //Procéder a l'enregistrement des données
    formulaireDB.getFormulaireByNumeroSequence(id, (result) => {
        if (result.length == 1) {
            response.render('formulaire/formulaire-lecture', result[0]);
        } else {
            response.redirect('./');
        }
    });
});


/*
 ** Permet d'ajouter le formulaire 
 */
router.post('/formulaire/ajouter', function(request, response) {
    //Procéder a l'enregistrement des données
    formulaireDB.createFormulaire(request.body, (results) => {
        response.redirect('/');
    });
});


module.exports = router;