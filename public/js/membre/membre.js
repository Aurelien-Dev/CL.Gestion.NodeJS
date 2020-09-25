$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const SELECTOR_TYPE_ADHESION = '#type_adhesion';
    const SELECTOR_ROLE_MEMBRE = '#role';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';
    const SELECTOR_BTN_ENR_ROLE = '#enregistrerRole';
    const SELECTOR_MODAL_CREER_ADH = '#modalCreerAdhesion';
    const SELECTOR_FRM_CREER_ADH = '#frmCreerAdhesion';
    const SELECTOR_TBL_ADHESION = '#tblAdhesions';
    const SELECTOR_TBL_FICH_RISQ = '#tblFicheRisque';
    const SELECTOR_SUPP_ADH = '.supprimer-adhesion';
    const SELECTOR_DISSO_FICH = '.dissocier-formulaire';
    const SELECTOR_BTN_CREER_ADH = '#btnCreerAdhesion';
    const SELECTOR_INPUT_DAT_DEB = '#date_debut';

    var modalSupAdhesion = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: "Veux-tu supprimer l'adhésion ?",
        boutons: [{
            texte: 'Oui',
            callback: function() {
                supprimerFormulaireRisque(modalSupAdhesion.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalSupAdhesion.CacherModal();
            }
        }]
    });

    var modalDissocierFormulaire = new window.CL.Utilitaires.Modal({
        titre: 'Dissocier la fiche de risque',
        body: "Veux-tu séparer la fiche de risque du membre ?",
        boutons: [{
            texte: 'Oui',
            callback: function() {
                dissocierFormulaireRisque(modalDissocierFormulaire.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalDissocierFormulaire.CacherModal();
            }
        }]
    });

    initialiserPage();

    /**
     * Permet d'initialiser la page
     */
    function initialiserPage() {
        $(SELECTOR_BTN_CREER_ADH).click((e) => { $(SELECTOR_MODAL_CREER_ADH).modal(); });
        $(SELECTOR_TYPE_ADHESION).change(appliquerInformationsAdhesion);
        $(SELECTOR_BTN_ENR_ROLE).click(modifierRole);
        $(SELECTOR_FRM_CREER_ADH).submit(eventCreerAdhesion);
        $('input[name=etudiant]').change(appliquerInformationsEtudiant);
        $(SELECTOR_TBL_ADHESION).on('click', SELECTOR_SUPP_ADH, eventClickSupprimerAdhesion);
        $(SELECTOR_TBL_FICH_RISQ).on('click', SELECTOR_DISSO_FICH, eventClickDissocierFormulaire);
        $(SELECTOR_INPUT_DAT_DEB).change(eventModifierDateFin);

        initialiserDatatableAdh();
        initialiserDatatableFiche();
        initialiserMasks();
    }

    /**
     * Permet d'initialiser les masques de saisies
     */
    function initialiserMasks() {
        $('#montant_paye').mask('000');
    }

    /**
     * Initialisation du datatable pour les adhésions
     */
    function initialiserDatatableAdh() {

        var configDatatable = {
            paging: false,
            searching: false,
            ordering: false,
            ajax: '/api/adhesion/' + $(SELECTOR_NO_SEQ_MEMBRE).val(),
            columns: [{
                width: '50px',
                render: function(data, type, row, meta) {
                    var composants = `<a href="/api/adhesion/` + row.numero_sequence + `" class="cl-icons supprimer-adhesion">
                                            <i class="far fa-trash-alt"></i>                   
                                        </a>`;

                    if (row.adresse_carte !== null) {
                        composants += `&nbsp;
                                        <a href="/membre/carte/` + row.numero_sequence_membre + `/` + row.numero_sequence + `">
                                            <i class="far fa-address-card"></i>
                                        </a>`;
                    }

                    return composants;
                }
            }, {
                data: 'date_debut',
                title: 'Date début'
            }, {
                data: 'date_fin',
                title: 'Date fin'
            }, {
                data: 'numero_membre',
                title: 'Numero de membre'
            }, {
                data: 'nom',
                title: 'Adhésion',
                render: function(data, type, row, meta) {
                    return data + (row.etudiant ? ' (étudiant)' : ' (non étudiant)');
                }
            }, {
                data: 'montant_paye',
                title: 'Montant payé',
                render: function(data, type, row, meta) {
                    return data + ' $';
                }
            }, {
                data: 'type_transaction_libelle',
                title: 'Transaction'
            }, {
                data: 'commentaire',
                title: 'Commentaire'
            }],
            rowCallback: function(row, data) {
                if (data.adh_actif) {
                    $(row).addClass('alert-success');
                } else {
                    $(row).addClass('alert-danger');
                }
            }
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $(SELECTOR_TBL_ADHESION).DataTable(configDatatable);
    }

    /**
     * Initialisation du datatable pour les fuche de risques
     */
    function initialiserDatatableFiche() {

        var configDatatable = {
            paging: false,
            searching: false,
            ordering: false,
            ajax: '/api/formulaires/' + $(SELECTOR_NO_SEQ_MEMBRE).val(),
            columns: [{
                data: 'numero_sequence',
                width: '50px',
                render: (data, type, row, meta) => {
                    return `<a href="/api/formulaires/dissocier/` + data + `" class="dissocier-formulaire">
                                <i class="fas fa-unlink"></i>
                            </a>
                            &nbsp;
                            <a href="/formulaire/consulter/` + data + `">
                                <i class="fas fa-file-alt"></i>
                            </a>
                            
                            `;
                }
            }, {
                data: 'nom_prenom_contact',
                title: "Contact"
            }, {
                data: 'adresse_contact',
                title: 'Adresse'
            }, {
                data: 'telephone_contact',
                title: 'Téléphone'
            }, {
                data: 'lien_contact',
                title: 'Lien'
            }, {
                data: 'date_acceptation',
                title: 'Signé le'
            }]
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $(SELECTOR_TBL_FICH_RISQ).DataTable(configDatatable);
    }


    /**
     * Permet de mettre à jour la date de fin au changement de la date de début
     * @param {jQuery Event} e Evenement
     */
    function eventModifierDateFin(e) {
        var optionSelected = $(SELECTOR_TYPE_ADHESION + '>option:selected');

        var anneeCourante = new Date().getFullYear();
        var dateDebut = $(SELECTOR_INPUT_DAT_DEB).val();
        var dateFin = null;
        var dateFin = optionSelected.data('fin');
        var nbrJour = optionSelected.data('nbr-jour');

        if (typeof nbrJour === 'undefined' || nbrJour === null || nbrJour === "") {
            dateFin = moment(dateFin, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
        } else {
            dateFin = moment(dateDebut).add(nbrJour, 'd').format('YYYY-MM-DD');
        }

        $(SELECTOR_MODAL_CREER_ADH + ' #date_fin').val(dateFin);
    }


    /**
     * Evenement permettant de faire la suppression d'une adhésion
     * @param {jQuery} e event object
     */
    function eventClickSupprimerAdhesion(e) {
        e.preventDefault();

        $that = $(this);
        modalSupAdhesion.ligne = $that.parents('tr');
        modalSupAdhesion.AfficherModal();
    }


    /**
     * Evenement permettant de faire la suppression d'une adhésion
     * @param {jQuery} e event object
     */
    function eventClickDissocierFormulaire(e) {
        e.preventDefault();

        $that = $(this);
        modalDissocierFormulaire.ligne = $that.parents('tr');
        modalDissocierFormulaire.AfficherModal();
    }


    /**
     * Permet de créer l'adhésion et de l'associer au membre
     * @param {event JQuery} e event
     */
    function eventCreerAdhesion(e) {
        e.preventDefault();

        var donnees = window.CL.Utilitaires.getFormData($(this));
        donnees.numero_sequence_membre = $(SELECTOR_NO_SEQ_MEMBRE).val();
        donnees.numero_sequence_type_adhesion = donnees.type_adhesion;

        $.ajax({
            url: '/api/adhesion/' + donnees.numero_sequence_membre,
            data: donnees,
            method: 'POST',
            success: function(result, statut) {
                $(SELECTOR_TBL_ADHESION).DataTable().ajax.reload();
                $(SELECTOR_MODAL_CREER_ADH).modal('hide');
                $(SELECTOR_FRM_CREER_ADH)[0].reset();
            }
        });
    }


    /**
     * Permet de supprimer une adhésion via une requête AJAX et de recharger le tableau
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function supprimerFormulaireRisque(ligne) {
        var href = $(ligne).find('.supprimer-adhesion').attr('href');

        $.ajax({
            url: href,
            method: 'delete',
            success: function(result, statut) {
                modalSupAdhesion.CacherModal();
                $(SELECTOR_TBL_ADHESION).DataTable().ajax.reload();
            }
        });
    }


    /**
     * Permet de supprimer un formulaire via une requête AJAX et de faire disparaitre la ligne du tableau
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function dissocierFormulaireRisque(ligne) {
        var href = $(ligne).find(SELECTOR_DISSO_FICH).attr('href');

        $.ajax({
            url: href,
            method: 'put',
            success: function(result, statut) {
                document.location.reload();
            }
        });
    }


    /**
     * Permet d'effectuer la modification du rôle du membre
     * @param {event JQuery} e Event
     */
    function modifierRole(e) {
        var numeroSequenceMembre = $(SELECTOR_NO_SEQ_MEMBRE).val();
        var role = $(SELECTOR_ROLE_MEMBRE).val();

        $.ajax({
            url: '/api/membres/ModifierRole/' + numeroSequenceMembre,
            data: { role: role },
            method: 'PUT',
            success: function(result, statut) {
                $.ambiance({
                    message: "Modification enregistrée.",
                    type: "success"
                });
            }
        });
    }


    /**
     * Permet de mettre à jour le montant lorsque l'on choisi étidiant ou non
     * @param {event JQuery} e Event
     */
    function appliquerInformationsEtudiant(e) {
        var option = $('#type_adhesion>option:selected');
        if (option.val() === '') {
            return;
        }

        var etudiant = $('input[name=etudiant]:checked').val()
        var montantPaye = 0;

        if (etudiant.toLowerCase() === 'true') {
            montantPaye = option.data('montant-etudiant');
        } else {
            montantPaye = option.data('montant');
        }

        $(SELECTOR_MODAL_CREER_ADH + ' #montant_paye').val(montantPaye);
    }


    /**
     * Permet d'insérer les informations du type d'adhésion aux champs
     * @param {event JQuery} e Event
     */
    function appliquerInformationsAdhesion(e) {
        var option = $('#type_adhesion>option:selected');
        var etudiant = $('input[name=etudiant]:checked').val()

        var anneeCourante = new Date().getFullYear();

        var dateDebut = option.data('debut');
        var dateFin = option.data('fin');
        var nbrJour = option.data('nbr-jour');
        var montantPaye = 0;

        if (etudiant.toLowerCase() === 'true') {
            montantPaye = option.data('montant-etudiant');
        } else {
            montantPaye = option.data('montant');
        }

        if (typeof nbrJour === 'undefined' || nbrJour === null || nbrJour === "") {
            dateDebut = moment(dateDebut, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
            dateFin = moment(dateFin, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
        } else {
            dateDebut = moment().format('YYYY-MM-DD');
            dateFin = moment().add(nbrJour, 'd').format('YYYY-MM-DD');
        }

        $(SELECTOR_MODAL_CREER_ADH + ' #date_debut').val(dateDebut);
        $(SELECTOR_MODAL_CREER_ADH + ' #date_fin').val(dateFin);
        $(SELECTOR_MODAL_CREER_ADH + ' #montant_paye').val(montantPaye);
    }

}(window, $));