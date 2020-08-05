const formulaireDB = require('../db/formulaireDB')
const membreDB = require('../db/membreDB')
const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/formulaire/ajouter', function(request, response) {
    response.render('formulaire/formulaire');
});

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire pour les membres 
 */
router.get('/formulaire/ajouter/:id', function(request, response) {
    const id = parseInt(request.params.id);

    //Chercher le membre
    membreDB.getMembreByNumeroSequence(id, function(membres) {
        if (membres.length == 1) {
            response.render('formulaire/formulaire', membres[0]);
        } else {
            response.status(404).render('maintenance/404', { message: "Le membre n'existe pas" });
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

module.exports = router;