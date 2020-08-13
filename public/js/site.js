$(function(window, $) {

    if ('undefined' == typeof(window.CL)) { window.CL = {}; }
    if ('undefined' == typeof(window.CL.Utilitaires)) { window.CL.Utilitaires = {}; }
    if ('undefined' == typeof(window.CL.Configuration)) { window.CL.Configuration = {}; }
    if ('undefined' == typeof(window.CL.View)) { window.CL.View = {}; }

    window.CL.Configuration.DatatableOptionsBase = {
        oLanguage: {
            sUrl: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/French.json'
        }
    };

}(window, $));