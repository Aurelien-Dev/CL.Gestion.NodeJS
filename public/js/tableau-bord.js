$(function() {

    var modalSupFormulaire = new window.CL.Utilitaires.Modal({
        titre: 'Suppression',
        body: 'Veux-tu supprimer le formulaire ?',
        boutons: [{
                texte: 'Oui',
                callback: function() {
                    supprimerFormulaire(modalSupFormulaire.ligne);
                }
            },
            {
                texte: 'Non',
                callback: function() {
                    modalSupFormulaire.CacherModal();
                }
            }
        ]
    });

    var modalAjouterMembre = new window.CL.Utilitaires.Modal({
        titre: 'Ajouter le membre',
        body: "Veux-tu ajouter et lui associer son formulaire d'accèptation des risques ?",
        boutons: [{
                texte: 'Oui',
                callback: function() {
                    ajouterMembre(modalAjouterMembre.ligne);
                }
            },
            {
                texte: 'Non',
                callback: function() {
                    modalAjouterMembre.CacherModal();
                }
            }
        ]
    });

    $('.supprimer-formulaire').click(function(e) {
        e.preventDefault();

        $that = $(this);
        modalSupFormulaire.ligne = $that.parents('tr');
        modalSupFormulaire.AfficherModal();
    });

    $('.ajouter-membre').click(function(e) {
        e.preventDefault();

        $that = $(this);
        modalAjouterMembre.ligne = $that.parents('tr');
        modalAjouterMembre.AfficherModal();
    });


    function supprimerFormulaire(ligne) {
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

    function ajouterMembre(ligne) {
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
});