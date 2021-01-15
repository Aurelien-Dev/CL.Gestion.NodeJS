$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_BTN_FERMER = '#btnFermer';
    const SELECTOR_BTN_ENREGISTRER = '#btnEnregistrer';

    initialiserPage();
    
    function initialiserPage() {
        $(SELECTOR_BTN_FERMER).click(eventClickbtnFermer);
        $(SELECTOR_BTN_ENREGISTRER).click(eventClickbtnEnregistrer);
    }

    function eventClickbtnFermer(e) {
        location.assign('/calculette');
    }

    function eventClickbtnEnregistrer(e) {
        e.preventDefault();

        var participants = [];
        console.log(location.href.substring(location.href.lastIndexOf("/")+1));
        $("input:checkbox[name=participants]").each(function() {participants.push($(this).prop("checked"));
        });
        var ligne = {description: $('#description').val(),
                    montant: $('#montant').val(),
                    participants: participants}
        var href = '/api/calculette/depense/' + location.href.substring(location.href.lastIndexOf("/")+1);
        console.log(ligne);
        $.ajax({
            url: href,
            method: 'put',
            data: ligne,
            success: function(result, statut) {
                location.assign('/calculette');
            }
        });

        
    }
}(window, $));