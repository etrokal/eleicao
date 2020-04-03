import compiler from "../intercoolerCompiler";
import Axios from "axios";

(() => {
  compiler("form.userForm", elt => {
    // input mask
    const im = new Inputmask("999.999.999-99");
    const inputCpf = $("input[name=cpf]")[0];
    im.mask(inputCpf);

    $(window).on("beforeunload", () => "");

    $(elt).on("submit", () => {
      $(window).off("beforeunload");
    });

    $(window).on("disableSubmit", e => {
      $("input[type=submit],button[type=submit]").prop("disabled", true);
    });

    $(window).on("enableSubmit", e => {
      $("input[type=submit],button[type=submit]").prop("disabled", false);
    });

    // Cleanup
    return () => {
      if (inputCpf.inputmask) inputCpf.inputmask.remove();
      $(window).off("beforeunload");

      $(elt).off("submit");
      $(window).off("disableSubmit");
      $(window).off("enableSubmit");
    };
  });
})();
