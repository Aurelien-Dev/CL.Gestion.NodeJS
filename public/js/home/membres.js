$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    initialiserPage();

    function initialiserPage() {
        var configDatatable = {
            paging: false
        };
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase);

        $("#membres").DataTable(configDatatable);
    }
}(window, $));