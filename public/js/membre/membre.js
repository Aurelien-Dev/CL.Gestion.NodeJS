$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const SELECTOR_TYPE_ADHESION = '#type_adhesion';
    const SELECTOR_ROLE_MEMBRE = '#role_membre';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';

    initialiserPage();

    function initialiserPage() {

        $('#eventCreerAdhesion').click(() => { $('#creerAdhesionModal').modal(); });
        $(SELECTOR_TYPE_ADHESION).change(() => { appliquerDateDebutFin(); });
        $('#enregistrerRole').click(() => { modifierRole(); });

        remplireTypesAdhesion();
    }

    function modifierRole() {
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

    function appliquerDateDebutFin() {
        var option = $('#type_adhesion>option:selected');

        var anneeCourante = new Date().getFullYear();

        var dateDebut = option.data('debut');
        var dateFin = option.data('fin');
        var nbrJour = option.data('nbr-jour');

        if (typeof nbrJour === 'undefined' || nbrJour == null) {
            dateDebut = moment(dateDebut, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
            dateFin = moment(dateFin, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
        } else {
            dateDebut = moment().format('YYYY-MM-DD');
            dateFin = moment().add(1, 'y').format('YYYY-MM-DD');
        }

        $('#creerAdhesionModal #date_debut').val(dateDebut);
        $('#creerAdhesionModal #date_fin').val(dateFin);
    }

    function remplireTypesAdhesion() {
        $(SELECTOR_TYPE_ADHESION).append('<option value=""></option>');
        $(SELECTOR_ROLE_MEMBRE).append('<option value=""></option>');

        setTimeout(() => {
            _.each(window.CL.Configuration.Types.TypeAdhesion, function(element, index, list) {
                $(SELECTOR_TYPE_ADHESION).append(`<option value="` + element.numero_sequence + `" 
                                                    data-nbr-jour="` + element.nombre_jour + `" 
                                                    data-debut="` + element.date_debut + `" 
                                                    data-fin="` + element.date_fin + `">` + element.nom +
                    `</option>`);
            });

            _.each(window.CL.Configuration.Types.Enums.ROLE, function(element, index, list) {
                var selected = '';
                if ($(SELECTOR_ROLE_MEMBRE).data('value') === index) {
                    selected = 'selected';
                }

                $(SELECTOR_ROLE_MEMBRE).append(`<option value="` + index + `" ` + selected + `>` + element + `</option>`);
            });
        }, 200);
    }


}(window, $));