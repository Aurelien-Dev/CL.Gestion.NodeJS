$(function(window, $) {


    /**
     * Permet d'obtenir toutes les données d'un formulaire
     * @param {jquery} $form Objet jQuery d'un formulaire
     */
    window.CL.Utilitaires.getFormData = function getFormData($form) {
        var unindexed_array = $form.serializeArray();
        var indexed_array = {};

        $.map(unindexed_array, function(n, i) {
            indexed_array[n['name']] = n['value'];
        });

        return indexed_array;
    };


}(window, $));