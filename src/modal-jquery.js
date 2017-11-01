import Modal from './modal.js';
import * as ModalInstance from './instance.js';

export default function($) {
  $.toast = ModalInstance.toast;
  $.alert = ModalInstance.alert;
  $.prompt = ModalInstance.prompt;
  $.confirm = ModalInstance.confirm;

  function Plugin(param) {
    return this.each(function() {
      let $this = $(this);
      let data = $this.data('f2e-modal');
      let options = typeof param === "object"
        ? param
        : null;
      if (!data) {
        $this.data('f2e-modal', (data = new Modal(options, this)))
      }
      if (param == "show") {
        data.show();
      } else if (param == "hide") {
        data.hide();
      } else if (param == "destroy") {
        data.destroy();
      }
    })
  }

  var old = $.fn.modal
  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal
  $.fn.modal.noConflict = function() {
    $.fn.modal = old
    return this
  }
};
