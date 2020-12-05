const formulaireDB = require('../db/formulaireDB');
const membreDB = require('../db/membreDB');
const express = require('express');
const router = express.Router();
const async = require('async');

/*
 ** Permet de consulter un formulaire existant, sinon retourne a la page d'accueil
 */
router.get('/formulaire/consulter/:id', (request, response) => {
    const id = parseInt(request.params.id);

    //Procéder a l'enregistrement des données
    formulaireDB.getFormulaireByNumeroSequence(id, (result) => {
        if (result.length == 1) {
            response.render('inscriptionMembre/formulaire/formulaire-lecture', result[0]);
        } else {
            response.redirect('./');
        }
    });
});

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/public/formulaire/ajouter', (request, response) => {
    response.render('inscriptionMembre/formulaire/formulaire-ajout', {
        layout: 'publicTemplate',
        public: true
    });
});

/*
 ** Affichage de la page d'ajout d'un nouveau formulaire
 */
router.get('/public/formulaire/recu', (request, response) => {
    response.render('inscriptionMembre/formulaire/formulaire-recu', {
        layout: 'publicTemplate'
    });
});


/*
 ** Permet d'ajouter le formulaire 
 */
router.post('/public/formulaire/ajouter', (request, response) => {

    async.waterfall([
            //Création du membre
            (callback) => {
                membreDB.createMembre(request.body, (result) => {
                    callback(null, result);
                });
            },
            //Création de son formulaire
            (numeroSequenceMembre, callback) => {
                request.body.numero_sequence_membre = numeroSequenceMembre;

                formulaireDB.createFormulaire(request.body, (results) => {
                    callback(numeroSequenceMembre);
                });
            }
        ],
        () => {
            response.redirect('/public/formulaire/recu');
        }
    );
});


module.exports = router;