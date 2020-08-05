(function(window, $) {

    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }


    $('.supprimer-formulaire').click(function(e) {
        e.preventDefault();

        $that = $(this);
        window.CL.View.tableauBord.modalSupFormulaire.ligne = $that.parents('tr');
        window.CL.View.tableauBord.modalSupFormulaire.AfficherModal();
    });

    $('.ajouter-membre').click(function(e) {
        e.preventDefault();

        $that = $(this);
        window.CL.View.tableauBord.modalAjouterMembre.ligne = $that.parents('tr');
        window.CL.View.tableauBord.modalAjouterMembre.AfficherModal();
    });



}(window, $));