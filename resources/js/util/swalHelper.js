import Swal from "sweetalert2";

export const swalConfirm = (
  text,
  title = "Tem certeza?",
  confirmButtonText = "Sim",
  cancelButtonText = "Não"
) => {
  return Swal.fire({
    title,
    text,
    icon: "question",
    showCancelButton: true,
    cancelButtonText,
    confirmButtonText
  }).then(result => result.value);
};

export const swalFlashSuccess = (text, title = "Sucesso!", timer = 1000) => {
  Swal.fire({
    title,
    text,
    icon: "success",
    showCancelButton: false,
    showConfirmButton: false,
    timer
  });
};

export const swalFlashError = (text, title = "Erro!", timer = 1000) => {
  Swal.fire({
    title,
    text,
    icon: "error",
    showCancelButton: false,
    showConfirmButton: false,
    timer
  });
};

export const swalAlertInfo = (
  text,
  title = "Informação",
  confirmButtonText = "Ok"
) => {
  Swal.fire({
    title,
    text,
    icon: "info",
    showConfirmButton: true,
    confirmButtonText
  });
};

export const swalAlertWarning = (
  text,
  title = "Atenção",
  confirmButtonText = "Entendi"
) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showConfirmButton: true,
    confirmButtonText
  });
};
