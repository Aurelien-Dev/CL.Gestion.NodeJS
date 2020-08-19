$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const SELECTOR_TYPE_ADHESION = '#type_adhesion';
    const SELECTOR_ROLE_MEMBRE = '#role';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';
    const SELECTOR_BTN_ENR_ROLE = '#enregistrerRole';
    const SELECTOR_MODAL_CREER_ADH = '#modalCreerAdhesion';
    const SELECTOR_FRM_CREER_ADH = '#frmCreerAdhesion';
    const SELECTOR_TBL_ADHESION = '#tblAdhesions';
    const SELECTOR_SUPP_ADH = '.supprimer-adhesion';
    const SELECTOR_BTN_CREER_ADH = '#btnCreerAdhesion';

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


    initialiserPage();

    /**
     * Permet d'initialiser la page
     */
    function initialiserPage() {
        $(SELECTOR_BTN_CREER_ADH).click((e) => { $(SELECTOR_MODAL_CREER_ADH).modal(); });
        $(SELECTOR_TYPE_ADHESION).change(appliquerInformationsAdhesion);
        $(SELECTOR_BTN_ENR_ROLE).click(modifierRole);
        $(SELECTOR_FRM_CREER_ADH).submit(creerAdhesion);
        $('input[name=etudiant]').change(appliquerInformationsEtudiant);
        $(SELECTOR_TBL_ADHESION).on('click', SELECTOR_SUPP_ADH, eventClickSupprimerAdhesion);

        initialiserDatatableAdh();
        initialiserDatatableFiche();
        initialiserMasks();
    }

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
                render: function(data, type, row, meta) {
                    return `<a href="/api/adhesion/` + row.numero_sequence + `" class="cl-icons supprimer-adhesion">
                                <i class="far fa-trash-alt"></i>                   
                            </a>`;
                }
            }, {
                data: 'date_debut',
                title: 'Date début'
            }, {
                data: 'date_fin',
                title: 'Date fin'
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
                render: (data, type, row, meta) => {
                    return `<a href="/formulaire/consulter/` + data + `">
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
                title: 'Nom du contact'
            }, {
                data: 'adresse_contact',
                title: 'Adresse du contact'
            }, {
                data: 'telephone_contact',
                title: 'Téléphone du contact'
            }, {
                data: 'lien_contact',
                title: 'Lien de parenté'
            }, {
                data: 'date_acceptation',
                title: 'Date de signature'
            }]
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $('#tblFicheRisque').DataTable(configDatatable);
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
     * Permet de créer l'adhésion et de l'associer au membre
     * @param {event JQuery} e event
     */
    function creerAdhesion(e) {
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
            dateFin = moment().add(1, 'y').format('YYYY-MM-DD');
        }

        $(SELECTOR_MODAL_CREER_ADH + ' #date_debut').val(dateDebut);
        $(SELECTOR_MODAL_CREER_ADH + ' #date_fin').val(dateFin);
        $(SELECTOR_MODAL_CREER_ADH + ' #montant_paye').val(montantPaye);
    }

}(window, $));