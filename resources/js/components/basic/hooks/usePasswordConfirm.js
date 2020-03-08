const usePasswordConfirm = (passwordInputId, inputHandler) => {
  const handlePasswordConfirmChange = e => {
    e.persist();
    const inputPassword = document.getElementById(passwordInputId);
    const inputPasswordConfirm = e.target;

    if (inputPassword.value === inputPasswordConfirm.value) {
      inputPasswordConfirm.setCustomValidity("");
    } else {
      inputPasswordConfirm.setCustomValidity("As senhas devem ser iguais");
    }

    inputHandler(e);
  };

  return {
    handlePasswordConfirmChange
  };
};

export default usePasswordConfirm;
