(function(up) {
  up.compiler("div.user-form", function(el) {
    const inputCpf = $(el).find("input[name=cpf]")[0];
    const im = new Inputmask("999.999.999-99");
    im.mask(inputCpf);

    return function() {
      if (inputCpf.inputmask) inputCpf.inputmask.remove();
    };
  });
})(up);
