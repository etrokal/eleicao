import compiler from "../intercoolerCompiler";

(() => {
  compiler("form", elt => {
    let submitSelector = "input[type=submit],button[type=submit]";

    $(window).on("disableSubmit", () => {
      $(submitSelector).prop("disabled", true);
    });

    $(window).on("enableSubmit", () => {
      $(submitSelector).prop("disabled", false);
    });

    return () => {
      $(window).off("disableSubmit");
      $(window).off("enableSubmit");
    };
  });
})();
