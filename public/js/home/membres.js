(function(window, $) {
    if ('undefined' == typeof(window.CL.View.tableauBord)) { window.CL.View.tableauBord = {}; }

    $("#membres").DataTable(window.CL.Configuration.DatatableOptionsBase);

}(window, $));