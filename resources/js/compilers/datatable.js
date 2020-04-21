(function(up) {
  up.compile("div.datatable", function($el) {
    const unbindClick = up.on("click", "a.delete-link", function(ev, el) {

    });

    return function() {
      unbindClick();
    };
  });
})(up);
