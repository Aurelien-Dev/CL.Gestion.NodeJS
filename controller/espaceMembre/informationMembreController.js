const express = require('express');
const async = require('async');
const moment = require('moment');

const formulaireDB = require('../../db/formulaireDB');
const membreDB = require('../../db/membreDB');
const adhesionDB = require('../../db/adhesionDB');
const typeAdhesionDB = require('../../db/typeAdhesionDB');

const gererConnexion = require('../../services/gererConnexion');
const json = require('../../configs/enumerations.json');
const utilitaires = require('../../utils/utilitaires');
const router = express.Router();


/*
 ** Affichage de la page de login
 */
router.get('/mon-espace', [gererConnexion.gererMembre, funcMonEspace]);

function funcMonEspace(request, response) {
    const id = request.session.userConnected.numero_sequence;

    // var id = 13;
    async.waterfall([
        //Obtention des informations du membre
        (callback) => {
            callback(null, request.session.userConnected);
        },
        //Obtention de ces formulaires de risques
        (infoMembre, callback) => {
            formulaireDB.getFormulaireActifByNumeroSequenceMembre(id, (infoFormulairesMembre) => {
                callback(null, infoMembre, infoFormulairesMembre);
            });
        },
        //Obtention de ces adhésions
        (infoMembre, infoFormulairesMembre, callback) => {
            adhesionDB.getAdhesionByNumeroSequenceMembre(id, (infoAdhesionsMembre) => {
                callback(null, infoMembre, infoFormulairesMembre, infoAdhesionsMembre);
            });
        },
        //Obtention des énumérations
        (infoMembre, infoFormulairesMembre, infoAdhesionsMembre, callback) => {
            var listEnum = {
                TYPE_TRANSAC: utilitaires.EnumToList(json.TYPE_TRANSAC)
            };
            callback(null, infoMembre, infoFormulairesMembre, infoAdhesionsMembre, listEnum);
        },
        (infoMembre, infoFormulairesMembre, infoAdhesionsMembre, listEnum, callback) => {
            typeAdhesionDB.getTypeAdhesion((typeAdhesion) => {
                callback(null, infoMembre, infoFormulairesMembre, infoAdhesionsMembre, listEnum, typeAdhesion);
            });
        }
    ], (err, infoMembre, infoFormulairesMembre, infoAdhesionsMembre, listEnum, typeAdhesion) => {
        if (err !== null && typeof err !== 'undefined') {
            response.status(500);
        }

        response.render('espaceMembre/espace-personnel', {
            layout: 'template-membre',
            membre: infoMembre,
            formulaire: infoFormulairesMembre,
            adhesions: infoAdhesionsMembre,
            enumeration: listEnum,
            typeAdhesion: typeAdhesion
        });
    });
}

router.post('/demander-carte', [gererConnexion.gererMembre, (request, response) => {
    var estEtudiant = request.body.etudiant === 'true';

    if (request.body.date_debut !== '') {
        var dateDebut = moment(request.body.date_debut, 'YYYY-MM-DD').set('year', moment().year())
        var dateFin = moment(request.body.date_fin, 'YYYY-MM-DD').set('year', moment().year())
    } else if (request.body.nbr_jour !== '') {
        var dateDebut = moment();
        var dateFin = moment().add(request.body.nbr_jour, 'days');
    }

    var adhesion = {
        date_debut: dateDebut,
        date_fin: dateFin,
        montant_paye: request.body.montant,
        date_transaction: moment().format('l'),
        type_transaction: request.body.type_transaction,
        etudiant: estEtudiant,
        numero_sequence_membre: request.body.numero_sequence_membre,
        numero_sequence_type_adhesion: request.body.type_carte,
        commentaire: 'Demande de carte faite par le membre.',
        numero_membre: moment(dateDebut).format('YYYY') + '-' + request.body.type_carte + '-' + request.body.numero_sequence_membre
    };

    if (estEtudiant)
        adhesion.numero_sequence_statut_demande = 1;
    else
        adhesion.numero_sequence_statut_demande = 2;

    adhesionDB.createAdhesion(adhesion, () => {
        response.redirect(301, './');
    });
}]);

module.exports = router;