$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_SUPP_PARTICIPANT = '.supprimer-participant';
    const SELECTOR_TBL_MEMBRES = '#tbl-membres';
    const SELECTOR_FRM_AJT_PARTICIPANT = '#frmAjouterParticipant';
    const SELECTOR_MDL_AJT_PARTICIPANT = '#modalAjouterParticipant';
    const SELECTOR_AJT_PARTICIPANT = '#ajouterParticipant';
    const SELECTOR_FRM_AJT_DEPENSE = '#frmAjouterDepense';
    const SELECTOR_AJT_DEPENSE = '#ajouterDepense';
    const SELECTOR_MDL_AJT_DEPENSE = '#modalAjouterDepense';
    const SELECTOR_SUPP_DEPENSE = '.supprimer-depense';
    const SELECTOR_MOD_DEPENSE = '.modifier-depense';

    var modalSupParticipant = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer le participant ?',
        boutons: [{
            texte: 'Oui',
            callback: function() {
                desactiverMembre(modalSupParticipant.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalSupParticipant.CacherModal();
            }
        }]
    });

    var modalSupDepense = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer la dépense ?',
        boutons: [{
            texte: 'Oui',
            callback: function() {
                detruireDepense(modalSupDepense.ligne);
            }
        }, {
            texte: 'Non',
            callback: function() {
                modalSupDepense.CacherModal();
            }
        }]
    });

    initialiserPage();

    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_SUPP_PARTICIPANT).click(eventClickSupprimerParticipant);
        $(SELECTOR_FRM_AJT_PARTICIPANT).submit(eventEnregistrerParticipant);
        $(SELECTOR_AJT_PARTICIPANT).click(eventClickModalAjouterParticipant);
        $(SELECTOR_FRM_AJT_DEPENSE).submit(eventEnregistrerDepense);
        $(SELECTOR_AJT_DEPENSE).click(eventClickModalAjouterDepense);
        $(SELECTOR_SUPP_DEPENSE).click(eventClickSupprimerDepense);
        $(SELECTOR_MOD_DEPENSE).click(eventClickModalModifierDepense);

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
    function eventClickSupprimerParticipant(e) {
        e.preventDefault();

        $that = $(this);
        modalSupParticipant.ligne = $that.parents('tr');
        modalSupParticipant.AfficherModal();
    }

    function eventClickSupprimerDepense(e) {
        e.preventDefault();

        $that = $(this);
        modalSupDepense.ligne = $that.parents('tr');
        modalSupDepense.AfficherModal();
    }

    function eventClickModalAjouterParticipant(e) {
        $that = $(this);

        modalInstance = $(SELECTOR_MDL_AJT_PARTICIPANT).modal();

    }

    function eventClickModalAjouterDepense(e) {
        $that = $(this);

        modalInstance = $(SELECTOR_MDL_AJT_DEPENSE).modal();

    }

    function eventClickModalModifierDepense(e) {
        
        $that = $(this);
    }

    function eventEnregistrerParticipant(e) {
        e.preventDefault();
        modalAjouterParticipant = $(SELECTOR_MDL_AJT_PARTICIPANT).modal();

        var ligne = $('#nom').val()
        var href = '/api/calculette/participant';
        $.ajax({
            url: href,
            method: 'post',
            data: {nom: ligne},
            success: function(result, statut) {
                location.reload();
            }
        });
        
        //alert('stop');
    }

    function eventEnregistrerDepense(e) {
        e.preventDefault();
        modalAjouterParticipant = $(SELECTOR_MDL_AJT_DEPENSE).modal();

        var participants = [];
        $("input:checkbox[name=participants]").each(function() {participants.push($(this).prop("checked"));
        });
        var ligne = {description: $('#description').val(),
                    montant: $('#montant').val(),
                    participants: participants,
                    rembourser: parseInt($("select[name=rembourser]").val()),
                    kilometres: parseInt($('#kilometres').val())}
        var href = '/api/calculette/depense';
        console.log(ligne);
        $.ajax({
            url: href,
            method: 'post',
            data: ligne,
            success: function(result, statut) {
                location.reload();
            }
        });
        
    }

    /**
     * Permet d'effectuer la modification du rôle du membre
     * @param {$ligne} ligne Élément jQuery qui correspond à la ligne du membre
     */
    function desactiverMembre(ligne) {
        var href = $(ligne).find(SELECTOR_SUPP_PARTICIPANT).attr('href');
        console.log(href);
        $.ajax({
            url: href,
            method: 'DELETE',
            success: function(result, statut) {
                modalSupParticipant.CacherModal();
                location.reload();
            }
        });
    }

    function detruireDepense(ligne) {
        var href = $(ligne).find(SELECTOR_SUPP_DEPENSE).attr('href');
        console.log(href);
        $.ajax({
            url: href,
            method: 'DELETE',
            success: function(result, statut) {
                modalSupDepense.CacherModal();
                location.reload();
            }
        });
    }
}(window, $));