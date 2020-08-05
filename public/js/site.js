// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

$(function(window, $) {

    if ('undefined' == typeof(window.CL)) { window.CL = {}; }
    if ('undefined' == typeof(window.CL.Utilitaires)) { window.CL.Utilitaires = {}; }
    if ('undefined' == typeof(window.CL.Configuration)) { window.CL.Configuration = {}; }
    if ('undefined' == typeof(window.CL.View)) { window.CL.View = {}; }

    window.CL.Configuration.DatatableOptionsBase = {
        paging: false,
        scrollY: 300,
        oLanguage: {
            sUrl: 'https://cdn.datatables.net/plug-ins/1.10.21/i18n/French.json'
        }
    };

    $.get('/api/configuration', function(config) {
        window.CL.Configuration.Enumeration = config;
    });


}(window, $));