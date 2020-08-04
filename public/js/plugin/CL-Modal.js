(function(window, $) {

    window.CL.Utilitaires.Modal = function(options) {

        var that = this;
        var modalBase = '<div class="modal" tabindex="-1" role="dialog">' +
            '    <div class="modal-dialog" role="document">' +
            '       <div class="modal-content">' +
            '           <div class="modal-header">' +
            '              <h5 class="modal-title">Modal title</h5>' +
            '              <button type="button" class="close" data-dismiss="modal" aria-label="Close">' +
            '                  <span aria-hidden="true">&times;</span>' +
            '              </button>' +
            '           </div>' +
            '           <div class="modal-body">' +
            '           </div>' +
            '           <div class="modal-footer">' +
            '           </div>' +
            '       </div>' +
            '    </div>' +
            '</div>';

        var boutonBase = '<button type="button" class="btn btn-dark"></button>';

        that.AfficherModal = function() {
            RemplirModal(options.body, options.titre, options.boutons)

            $('body').append(modalBase);

            that.elModal.modal();
        };

        that.CacherModal = function() {
            that.elModal.modal('hide');
        };


        function RemplirModal(body, titre, boutons) {
            that.elModal = $(modalBase).clone();

            that.elModal.find('.modal-title').html(titre);
            that.elModal.find('.modal-body').html(body);

            if (typeof boutons === 'object') {
                for (var i in boutons) {
                    var elBouton = '';
                    var bouton = boutons[i];

                    elBouton = $(boutonBase).clone().html(bouton.texte);
                    elBouton.data('eventClick', bouton.callback);
                    that.elModal.find('.modal-footer').append(elBouton);

                    elBouton.on('click', function() {
                        var callback = $(this).data('eventClick');
                        callback();
                    });
                }
            }
        }
    };

}(window, $))