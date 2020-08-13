$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const paramsDatatable = {
        paging: false,
        scrollY: 500
    };

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

    modalAjouterMembre = new window.CL.Utilitaires.Modal({
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


    function initialiserPage() {

        var configDatatable = {};
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase, paramsDatatable);

        $("#formulaires").DataTable(configDatatable);

        $('.supprimer-formulaire').click(eventClickSupprimerFormulaire);
        $('.ajouter-membre').click(eventClickAjouterMembre);
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
        var href = $(ligne).find('.supprimer-formulaire').attr('href');

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
        var href = $(ligne).find('.ajouter-membre').attr('href');

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