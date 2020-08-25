const formulaireDB = require('../db/formulaireDB');
const express = require('express');
const router = express.Router();

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