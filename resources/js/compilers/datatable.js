import { swalConfirm } from "../util/swalHelper";
import Axios from "axios";

(function(up) {
  up.compiler("div.datatable", function($el) {
    const unbindClick = up.on("click", "a.delete-link", function(ev, el) {
      swalConfirm("O usuário será apagado do sistema.", "Tem certeza?").then(
        result => {
          if (result) {
            Axios.delete(el.href).then(result => {
              up.reload("div.datatable");
            });
          }
        }
      );
    });

    return function() {
      unbindClick();
    };
  });
})(up);
