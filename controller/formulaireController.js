const mappers = require('../mappers/submitFormulaireMapper.js');
const formulaireDB = require('../db/formulaireDB')
const express = require('express');
const router = express.Router();

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/ajouter-formulaire', function(request, response) {
    response.render('home/formulaire');
});


/*
 ** Permet d'ajouter le formulaire 
 */
router.post('/EnregistrerFormulaireInterne', function(request, response) {
    //Procéder a l'enregistrement des données
    formulaireDB.createFormulaire(request.body, (results) => {
        //response.render('Home/formulaire');
        response.redirect('./');
    });
});


/*
 ** Permet de consulter un formulaire existant, sinon retourne a la page d'accueil
 */
router.get('/consulter-formulaire/:id', function(request, response) {
    const id = parseInt(request.params.id);

    //Procéder a l'enregistrement des données
    formulaireDB.getFormulaireByNumeroSequence(id, (result) => {
        if (result.length == 1) {
            response.render('home/formulaire-lecture', result[0]);
        } else {
            response.redirect('./');
        }
    });
});


// /*
//  ** Permet de supprimer un formulaire existant
//  */
// router.get('/supprimer-formulaire/:id', function(request, response) {
//     const id = parseInt(request.params.id);

//     //Procéder a l'enregistrement des données
//     formulaireDB.deleteFormulaireByNumeroSequence(id, (result) => {
//         response.redirect('./');
//     });
// });


module.exports = router;