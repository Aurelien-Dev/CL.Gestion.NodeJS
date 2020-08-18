$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_SUPP_FRM = '.supprimer-formulaire';
    const SELECTOR_AJOUT_MBR = '.ajouter-membre';
    const SELECTOR_LIER_FRM = '.lier-formulaire';
    const SELECTOR_TBL_FRMS = '#tbl-formulaires';
    const SELECTOR_MDL_CREER_ADH = '#modalCreerAdhesion';

    var modalSupFormulaire = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer le formulaire ?',
        boutons: [{
            texte: 'Oui',
            callback: function() {
                supprimerFormulaireRisque(modalSupFormulaire.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalSupFormulaire.CacherModal();
            }
        }]
    });

    var modalAjouterMembre = new window.CL.Utilitaires.Modal({
        titre: 'Ajouter le membre',
        body: "Veux-tu creer le nouveau membre à partir de ce formulaire de risque ?",
        boutons: [{
            texte: 'Oui',
            callback: function() {
                ajouterNouveauMembre(modalAjouterMembre.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalAjouterMembre.CacherModal();
            }
        }]
    });

    initialiserPage();


    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_SUPP_FRM).click(eventClickSupprimerFormulaire);
        $(SELECTOR_AJOUT_MBR).click(eventClickAjouterMembre);
        $(SELECTOR_LIER_FRM).click((e) => { $(SELECTOR_MDL_CREER_ADH).modal(); });

        initialiserSelect2();
        initialiserDatatable();
    }

    /**
     * Initialisation du datatable
     */
    function initialiserDatatable() {
        var configDatatable = {
            paging: false
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $(SELECTOR_TBL_FRMS).DataTable(configDatatable);
    }

    /**
     * Initialisation du champ select2 pour la recherche de membres
     */
    function initialiserSelect2() {
        $('.js-example-basic-multiple').select2({
            selectOnClose: true,
            dropdownParent: SELECTOR_MDL_CREER_ADH,
            placeholder: "Selectionne un membre",
            ajax: {
                url: '/api/utilitaire/membreAutocomplete',
                dataType: 'json'
            }
        });
    }

    /**
     * Evenement permettant de faire la suppression d'un formulaire
     * @param {jQuery} e event object
     */
    function eventClickSupprimerFormulaire(e) {
        e.preventDefault();

        $that = $(this);
        modalSupFormulaire.ligne = $that.parents('tr');
        modalSupFormulaire.AfficherModal();
    }

    /**
     * Evenement qui permet de faire l'ajout d'un nouveau membre via son formulaire de risque
     * @param {jQuery} e event object
     */
    function eventClickAjouterMembre(e) {
        e.preventDefault();

        $that = $(this);
        modalAjouterMembre.ligne = $that.parents('tr');
        modalAjouterMembre.AfficherModal();
    }

    /**
     * Permet de supprimer un formulaire via une requête AJAX et de faire disparaitre la ligne du tableau
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function supprimerFormulaireRisque(ligne) {
        var href = $(ligne).find(SELECTOR_SUPP_FRM).attr('href');

        $.ajax({
            url: href,
            method: 'delete',
            success: function(result, statut) {
                modalSupFormulaire.CacherModal();
                $(ligne).hide('slow');
            }
        });
    }

    /**
     * Permet d'ajouter un nouveau membre via une requête AJAX et de recharger la page
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne d'un formulaire
     */
    function ajouterNouveauMembre(ligne) {
        var href = $(ligne).find(SELECTOR_AJOUT_MBR).attr('href');

        $.ajax({
            url: href,
            method: 'post',
            success: function(result, statut) {
                modalAjouterMembre.CacherModal();
                location.reload();
            }
        });
    }

}(window, $));