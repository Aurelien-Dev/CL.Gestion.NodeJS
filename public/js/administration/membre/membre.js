$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const SELECTOR_ROLE_MEMBRE = '#role';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';
    const SELECTOR_BTN_ENR_ROLE = '#enregistrerRole';
    const SELECTOR_TBL_ADHESION = '#tblAdhesions';
    const SELECTOR_TBL_FICH_RISQ = '#tblFicheRisque';
    const SELECTOR_SUPP_ADH = '.supprimer-adhesion';

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
        $(SELECTOR_TBL_ADHESION).on('click', SELECTOR_SUPP_ADH, eventClickSupprimerAdhesion);

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
            ajax: '/api/adhesion/' + $(SELECTOR_NO_SEQ_MEMBRE).val(),
            columns: [{
                width: '25px',
                render: function(data, type, row, meta) {
                    var composants = `<a href="/api/adhesion/` + row.numero_sequence + `" class="cl-icons supprimer-adhesion">
                    <i class="far fa-trash-alt"></i>                   
                  </a>
                  <br>
                <a href="#" class="cl-icons editer-adhesion">
                    <i class="far fa-edit"></i>                 
                </a><br>`;

                    if (row.numero_sequence_statut_demande === 99) {
                        if (row.adresse_carte !== null) {
                            composants += `<a href="/membre/carte/` + row.numero_sequence_membre + `/` + row.numero_sequence + `">
                                            <i class="far fa-address-card"></i>
                                        </a>`;
                        }
                    } else {
                        composants += `<i class="far fa-address-card"></i>`;
                    }

                    return composants;
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
                width: '175px',
                data: 'commentaire',
                title: 'Commentaire'
            }, {
                data: 'libelle_statut_demande',
                title: 'Statut demande'
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
     * Permet de supprimer une adhésion via une requête AJAX et de recharger le tableau
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function supprimerAdhesion(ligne) {
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

}(window, $));