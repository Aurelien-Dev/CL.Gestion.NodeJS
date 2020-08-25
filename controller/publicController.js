const formulaireDB = require('../db/formulaireDB');
const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/public/formulaire/ajouter', function(request, response) {
    response.render('formulaire/formulaire', {
        layout: 'publicTemplateBase',
        public: true
    });
});
/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/public/formulaire/recu', function(request, response) {
    response.render('formulaire/formulaire-recu', {
        layout: false
    });
});


/*
 ** Permet d'ajouter le formulaire 
 */
router.post('/public/formulaire/ajouter', function(request, response) {
    //Procéder a l'enregistrement des données
    formulaireDB.createFormulaire(request.body, (results) => {
        response.redirect('/public/formulaire/recu');
    });
});


module.exports = router;