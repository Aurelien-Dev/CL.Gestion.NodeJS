$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_SUPP_MBR = '.supprimer-membre';
    const SELECTOR_TBL_MEMBRES = '#tbl-membres';
    const SELECTOR_FRM_ENR_ASSO = '#frmAjouterParticipant';
    const SELECTOR_MDL_CREER_ADH = '#modalAjouterParticipant';
    const SELECTOR_LIER_FRM = '#ajouterParticipant';

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
        $(SELECTOR_FRM_ENR_ASSO).submit(eventEnregistrerParticipant);
        $(SELECTOR_LIER_FRM).click(eventClickModalAjouterParticipant);

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

    function eventClickModalAjouterParticipant(e) {
        $that = $(this);

        modalInstance = $(SELECTOR_MDL_CREER_ADH).modal();

        //var ligne = $(e.currentTarget).parents('tr');
        //var info_fiche = ligne.data('info-fiche');
        //var seq_fiche = ligne.data('seq-fiche');

        //$('#infoFiche').html(info_fiche);
        //modalInstance.ligne = ligne;
    }

    function eventEnregistrerParticipant(e) {
        e.preventDefault();
        modalAjouterParticipant = $(SELECTOR_MDL_CREER_ADH).modal();

        var ligne = $('#nom').val()
        var href = '/api/calculette/membre';
        console.log(href);
        console.log(ligne);
        $.ajax({
            url: href,
            method: 'post',
            data: {nom: ligne},
            success: function(result, statut) {
                console.log('un succès');
                location.reload();
            }
        });
        
        //alert('stop');
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