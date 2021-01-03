$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_SUPP_MBR = '.supprimer-membre';
    const SELECTOR_TBL_MEMBRES = '#tbl-membres';

    var modalSupMembre = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer le membre ?',
        boutons: [{
            texte: 'Oui',
            callback: function() {
                desactiverMembre(modalSupMembre.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalSupMembre.CacherModal();
            }
        }]
    });

    initialiserPage();

    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_SUPP_MBR).click(eventClickSupprimerMembre);

        initialiserDatatale();
    }

    /**
     * Initialisation du datatable
     */
    function initialiserDatatale() {
        var configDatatable = {
            paging: false
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $(SELECTOR_TBL_MEMBRES).DataTable(configDatatable);
    }

    /**
     * Evenement permettant de faire la suppression d'une adhésion
     * @param {jQuery} e event object
     */
    function eventClickSupprimerMembre(e) {
        e.preventDefault();

        $that = $(this);
        modalSupMembre.ligne = $that.parents('tr');
        modalSupMembre.AfficherModal();
    }

    /**
     * Permet d'effectuer la modification du rôle du membre
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne du membre
     */
    function desactiverMembre(ligne) {
        var href = $(ligne).find(SELECTOR_SUPP_MBR).attr('href');

        $.ajax({
            url: href,
            method: 'PUT',
            success: function(result, statut) {
                modalSupMembre.CacherModal();
                $(ligne).hide('slow');
            }
        });
    }
}(window, $));