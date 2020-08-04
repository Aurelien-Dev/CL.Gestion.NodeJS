$(function() {

    var modal = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer le formulaire ?',
        boutons: [{
                texte: 'Oui',
                callback: function(a, b, c) {
                    supprimerMembre(modal.ligne);
                }
            },
            {
                texte: 'Non',
                callback: function(a, b, c) {
                    modal.CacherModal();
                }
            }
        ]
    });

    $('.supprimer-formulaire').click(function(e) {
        e.preventDefault();

        $that = $(this);
        modal.ligne = $that.parents('tr');
        modal.AfficherModal();
    });


    function supprimerMembre(ligne) {

        var href = $(ligne).find('.supprimer-formulaire').attr('href');

        $.ajax({
            url: href,
            method: 'delete',
            success: function(result, statut) {
                modal.CacherModal();
                $(ligne).hide('slow');
            }
        })
    }


});