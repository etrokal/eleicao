import compiler from "../intercoolerCompiler";

(() => {
  const linkSelector = "a.triggerUserModal";

  let modalHandler = e => {
    e.preventDefault();
    let $el = $(e.target);
    $("#userShowModal").modal('show');
  };

  compiler(linkSelector, elt => {
    $(linkSelector).on("click", modalHandler);

    return () => {
      $(linkSelector).off("click", linkSelector, modalHandler);
    };
  });
})();
