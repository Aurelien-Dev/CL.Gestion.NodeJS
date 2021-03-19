$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_MONTANT = '#montant';
    const SELECTOR_CHK_ETUDIANT = '[name=etudiant]:checked';
    const SELECTOR_SEL_TYPECARTE = '#type_carte option:selected';
    const SELECTOR_DATEDEBUT = '#date_debut';
    const SELECTOR_DATEFIN = '#date_fin';
    const SELECTOR_NBRJOUR = '#nbr_jour';
    const SELECTOR_BTN_DEMANDERADH = '#btnDemanderAdhesion';
    const SELECTOR_FORM_VALID = '#formulaireValid';
    const SELECTOR_LNK_RISQUE = '#linkFormulaireRisque';
    const SELECTOR_FRM = '#frmCreerAdhesion';


    var modalInfoFormulaire = new window.CL.Utilitaires.Modal({
        titre: "<i class='fas fa-exclamation-circle'></i> Formulaire d'acceptation des risques",
        body: "Votre formulaire de risque n'est pas présent ou n'est plus valide.<br> Il faut d'abord le renseigner avant de demander une carte.<br><br> Merci :)",
        boutons: [{
            texte: 'Allons-y !',
            callback: function() {
                window.location = $(SELECTOR_LNK_RISQUE).attr('href');
            }
        }, {
            texte: 'Annuler',
            callback: function() {
                modalInfoFormulaire.CacherModal();
            }
        }]
    });


    initialiserPage();

    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_FRM).on('change', ModificationFormulaire);
        $(SELECTOR_BTN_DEMANDERADH).on('click', EventOuvrirModal);
    }

    /**
     * Évenement qui permet d'ouvrir la modal de demande de carte
     */
    function EventOuvrirModal() {
        if ($(SELECTOR_FORM_VALID).val() === 'true') {
            $('#modalCreerAdhesion').modal('toggle');
        } else {
            modalInfoFormulaire.AfficherModal();
        }
    }

    function ModificationFormulaire() {
        var estEtudiant = $(SELECTOR_CHK_ETUDIANT).val() === 'true';

        if (estEtudiant) {
            $(SELECTOR_MONTANT).val($(SELECTOR_SEL_TYPECARTE).data('montantEtudiant'));

        } else {
            $(SELECTOR_MONTANT).val($(SELECTOR_SEL_TYPECARTE).data('montant'));
        }

        $(SELECTOR_DATEDEBUT).val($(SELECTOR_SEL_TYPECARTE).data('date-debut'));
        $(SELECTOR_DATEFIN).val($(SELECTOR_SEL_TYPECARTE).data('date-fin'));
        $(SELECTOR_NBRJOUR).val($(SELECTOR_SEL_TYPECARTE).data('nbr-jour'));
    }


}(window, $));