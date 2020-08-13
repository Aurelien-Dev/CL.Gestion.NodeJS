$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.membre)) { window.CL.View.membre = {}; }

    const paramsDatatable = {
        paging: false,
        searching: false,
        ordering: false
    };

    const SELECTOR_TYPE_ADHESION = '#type_adhesion';
    const SELECTOR_ROLE_MEMBRE = '#role_membre';
    const SELECTOR_NO_SEQ_MEMBRE = '#numero_sequence_membre';
    const SELECTOR_BTN_ENR_ROLE = '#enregistrerRole';
    const SELECTOR_MODAL_CREER_ADH = '#modalCreerAdhesion';
    const SELECTOR_FRM_CREER_ADH = '#frmCreerAdhesion';

    var datatable = null;

    initialiserPage();

    function initialiserPage() {
        $('#eventCreerAdhesion').click((e) => { $(SELECTOR_MODAL_CREER_ADH).modal(); });
        $(SELECTOR_TYPE_ADHESION).change((e) => { appliquerInformationsAdhesion(); });
        $(SELECTOR_BTN_ENR_ROLE).click((e) => { modifierRole(); });
        $(SELECTOR_FRM_CREER_ADH).submit(creerAdhesion);
        remplireTypesAdhesion();

        initialiserDatatable();
    }

    function initialiserDatatable() {
        var configDatatable = {
            ajax: '/api/adhesion/1',
            columns: [{
                data: 'date_debut',
                title: 'Date début'
            }, {
                data: 'date_fin',
                title: 'Date fin'
            }, {
                data: 'nom',
                title: 'Adhésion'
            }, {
                data: 'montant_paye',
                title: 'Montant payé',
                render: function(data, type, row, meta) {
                    return data + ' $';
                }
            }, {
                data: 'type_transaction',
                title: 'Transaction'
            }],
            rowCallback: function(row, data) {

            }
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase, paramsDatatable);

        datatable = $('#tblAdhesions').DataTable(configDatatable);
    }


    function creerAdhesion(e) {
        e.preventDefault();

        var donnees = window.CL.Utilitaires.getFormData($(this));
        donnees.numero_sequence_membre = $(SELECTOR_NO_SEQ_MEMBRE).val();
        donnees.numero_sequence_type_adhesion = donnees.type_adhesion;

        $.ajax({
            url: '/api/adhesion/' + donnees.numero_sequence_membre,
            data: donnees,
            method: 'POST',
            success: function(result, statut) {
                $('#tblAdhesions').DataTable().ajax.reload();
                $(SELECTOR_MODAL_CREER_ADH).modal('hide');
            }
        });
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

    function appliquerInformationsAdhesion() {
        var option = $('#type_adhesion>option:selected');

        var anneeCourante = new Date().getFullYear();

        var dateDebut = option.data('debut');
        var dateFin = option.data('fin');
        var nbrJour = option.data('nbr-jour');
        var montantPaye = option.data('montant');

        if (typeof nbrJour === 'undefined' || nbrJour == null) {
            dateDebut = moment(dateDebut, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
            dateFin = moment(dateFin, 'YYYY-MM-DD').year(anneeCourante).format('YYYY-MM-DD');
        } else {
            dateDebut = moment().format('YYYY-MM-DD');
            dateFin = moment().add(1, 'y').format('YYYY-MM-DD');
        }

        $(SELECTOR_MODAL_CREER_ADH + ' #date_debut').val(dateDebut);
        $(SELECTOR_MODAL_CREER_ADH + ' #date_fin').val(dateFin);
        $(SELECTOR_MODAL_CREER_ADH + ' #montant_paye').val(montantPaye);
    }

    function remplireTypesAdhesion() {
        $(SELECTOR_TYPE_ADHESION).append('<option value=""></option>');
        $(SELECTOR_ROLE_MEMBRE).append('<option value=""></option>');

        setTimeout(() => {
            _.each(window.CL.Configuration.Types.TypeAdhesion, function(element, index, list) {
                $(SELECTOR_TYPE_ADHESION).append(`<option value="` + element.numero_sequence + `" 
                                                    data-montant="` + element.montant + `" 
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