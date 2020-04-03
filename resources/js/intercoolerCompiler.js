const compiler = function(selector, fn) {
  Intercooler.ready(function(elt) {
    let cleanupFn;
    const $el = $(elt).find(selector);

    if ($el.length > 0) {
      cleanupFn = fn($el);
    }

    // Cleanup
    $(document).on("beforeSwap.ic", function(e) {
      const el = e.target;

      //Check if the element selected is inside the element being swapped
      if ($(el).find(selector).length > 0 && cleanupFn) {
        cleanupFn();
      }
    });
  });
};

export default compiler;
