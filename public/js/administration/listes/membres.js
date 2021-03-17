$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const SELECTOR_TBL_MEMBRES = '#tbl-membres';

    initialiserPage();

    /**
     * Initialisation de la page
     */
    function initialiserPage() {
        $(SELECTOR_SUPP_MBR).click(eventClickSupprimerMembre);

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

}(window, $));