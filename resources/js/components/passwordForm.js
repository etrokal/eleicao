import compiler from "../intercoolerCompiler";

(() => {
  compiler("form.passwordForm", elt => {
    $(window).on("closeModal", e => {
      $("userShowModal").modal("hide");
    });

    return () => {
      $(window).off("closeModal");
    };
  });
})();
