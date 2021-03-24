$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const SELECTOR_ROLE_MEMBRE = '#role';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';

    const SELECTOR_BTN_ENR_ROLE = '#enregistrerRole';
    const SELECTOR_BTN_MODIFIERADH = '#btnModifierAdhesion';
    const SELECTOR_BTN_SUPP_ADH = '#btnSupprimerAdhesion';

    const SELECTOR_MODAL_ADH = '#modalModifierAdhesion';
    const SELECTOR_TBL_ADHESION = '#tblAdhesions';
    const SELECTOR_TBL_FICH_RISQ = '#tblFicheRisque';

    var modalSupAdhesion = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: "Veux-tu supprimer l'adhésion ?",
        boutons: [{
            texte: 'Oui',
            callback: function() {
                supprimerAdhesion(modalSupAdhesion.ligne);
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
        $(SELECTOR_BTN_ENR_ROLE).on('click', modifierRole);
        $(SELECTOR_BTN_SUPP_ADH).on('click', eventClickSupprimerAdhesion);
        $(SELECTOR_BTN_MODIFIERADH).on('click', eventClickModifierAdhesion);

        initialiserDatatableAdhesion();
        initialiserDatatableFormulaireRisque();
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
    function initialiserDatatableAdhesion() {

        var configDatatable = {
            paging: false,
            searching: false,
            ordering: false,
            ajax: '/api/adhesions/' + $(SELECTOR_NO_SEQ_MEMBRE).val(),
            columns: [{
                width: '25px',
                render: function(data, type, row, meta) {
                    return '<input type="radio" name="action" value="' + row.numero_sequence + '">';
                }
            }, {
                data: 'numero_membre',
                title: 'Numero de membre'
            }, {
                width: '95px',
                data: 'date_debut',
                title: 'Date début'
            }, {
                width: '95px',
                data: 'date_fin',
                title: 'Date fin'
            }, {
                data: 'nom',
                title: 'Adhésion',
                render: (data, type, row, meta) => {
                    return data + (row.etudiant ? ' (étudiant)' : ' (non étudiant)');
                }
            }, {
                data: 'montant_paye',
                title: 'Montant',
                render: (data, type, row, meta) => {
                    return data + ' $';
                }
            }, {
                data: 'type_transaction_libelle',
                title: 'Transaction'
            }, {
                width: '175px',
                data: 'commentaire',
                title: 'Commentaire'
            }, {
                data: 'libelle_statut_demande',
                title: 'Statut demande'
            }, {
                data: 'numero_sequence_membre',
                title: 'Carte',
                render: (data, type, row, meta) => {
                    var composants = '';
                    if (row.numero_sequence_statut_demande === 99) {
                        if (row.adresse_carte !== null) {
                            composants += `<a href="/membre/carte/` + data + `/` + row.numero_sequence + `">
                                                    <i class="far fa-address-card"></i>
                                                </a>`;
                        }
                    } else {
                        composants += `<i class="far fa-address-card"></i>`;
                    }

                    return composants;
                }
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
    function initialiserDatatableFormulaireRisque() {

        var configDatatable = {
            paging: false,
            searching: false,
            ordering: false,
            ajax: '/api/formulaires/' + $(SELECTOR_NO_SEQ_MEMBRE).val(),
            columns: [{
                data: 'numero_sequence',
                width: '25px',
                render: (data, type, row, meta) => {
                    return `<a href="/formulaire/consulter/` + data + `">
                                <i class="fas fa-file-alt"></i>
                            </a>`;
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
    function eventClickModifierAdhesion(e) {
        var href = '/membre/ModalModifierAdhesion/' + $('input[name=action]:checked').val();

        $.ajax({
            url: href,
            method: 'get',
            success: function(result, statut) {
                $('#appendModal').html(result);
                $('#modalModifierAdhesion').modal('toggle');
            }
        });
    }

    /**
     * Permet de supprimer une adhésion via une requête AJAX et de recharger le tableau
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function supprimerAdhesion(ligne) {
        var href = '/api/adhesion/' + $('input[name=action]:checked').val();

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

}(window, $));