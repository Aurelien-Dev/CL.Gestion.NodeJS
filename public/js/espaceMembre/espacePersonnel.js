$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_MONTANT = '#montant';
    const SELECTOR_CHK_ETUDIANT = '[name=etudiant]:checked';
    const SELECTOR_SEL_TYPECARTE = '#type_carte option:selected';
    const SELECTOR_DATEDEBUT = '#date_debut';
    const SELECTOR_DATEFIN = '#date_fin';
    const SELECTOR_NBRJOUR = '#nbr_jour';

    const SELECTOR_FRM = '#frmCreerAdhesion';


    initialiserPage();

    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_FRM).on('change', function() {
            var estEtudiant = $(SELECTOR_CHK_ETUDIANT).val() === 'true';

            if (estEtudiant) {
                $(SELECTOR_MONTANT).val($(SELECTOR_SEL_TYPECARTE).data('montantEtudiant'));

            } else {
                $(SELECTOR_MONTANT).val($(SELECTOR_SEL_TYPECARTE).data('montant'));
            }

            $(SELECTOR_DATEDEBUT).val($(SELECTOR_SEL_TYPECARTE).data('date-debut'));
            $(SELECTOR_DATEFIN).val($(SELECTOR_SEL_TYPECARTE).data('date-fin'));
            $(SELECTOR_NBRJOUR).val($(SELECTOR_SEL_TYPECARTE).data('nbr-jour'));
        });
    }

}(window, $));