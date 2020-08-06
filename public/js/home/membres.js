$(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    initialiserPage();

    function initialiserPage() {
        $("#membres").DataTable(window.CL.Configuration.DatatableOptionsBase);
    }
}(window, $));