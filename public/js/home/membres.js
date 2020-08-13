$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    const paramsDatatable = {
        paging: false,
        scrollY: 500
    };

    initialiserPage();

    function initialiserPage() {
        var configDatatable = {};
        jQuery.extend(configDatatable, window.CL.Configuration.DatatableOptionsBase, paramsDatatable);

        $("#membres").DataTable(configDatatable);
    }
}(window, $));