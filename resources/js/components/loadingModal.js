import compiler from "../intercoolerCompiler";

(() => {
  let selector = "div.showModalLoadingIndicator";
  compiler(selector, elt => {
    $(selector).html(
      '<div class="modal-body"> \
        <p class="lead"><i class="fas fa-spinner fa-spin"></i> Carregando</p> \
        </div>'
    );
    $(selector).removeClass("showModalLoadingIndicator");
  });
})();
