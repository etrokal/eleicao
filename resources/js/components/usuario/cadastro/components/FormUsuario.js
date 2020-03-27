import React, { useReducer, useEffect, useRef } from "react";
import Inputmask from "inputmask";

import ValidarCpf from "../../../../util/ValidarCpf";
import FieldSpinner from "../../../basic/FieldSpinner";
import useComponentDidUpdate from "../../../basic/hooks/useComponentDidUpdate";
import Swal from "sweetalert2";

const FormUsuario = ({
  showModal,
  handleInputChange,
  handleEmailChange,
  handleCpfChange,
  handleCancelButton,
  validatingEmail,
  emailValid,
  cpfValid,
  validatingCpf,
  savingUser,
  handleSubmit,
  selectedUser,
  result
}) => {
  useEffect(() => {
    const cpfInput = document.getElementById("cpf");
    const im = new Inputmask("999.999.999-99");
    im.mask(cpfInput);

    return () => {
      cpfInput.inputmask.remove();
    };
  }, []);

  useEffect(() => {
    if (showModal) {
      $("#form-usuario-modal").modal({
        backdrop: "static",
        show: true
      });
    } else {
      $("#form-usuario-modal").modal("hide");
    }

    return () => {
      $("#form-usuario-modal").modal("hide");
    };
  }, [showModal, result]);

  useComponentDidUpdate(() => {
    const cpfInput = document.getElementById("cpf");
    if (!ValidarCpf(selectedUser.cpf)) {
      cpfInput.setCustomValidity("O número do CPF é inválido.");
    } else if (!cpfValid) {
      cpfInput.setCustomValidity("O cpf já foi cadastrado no sistema.");
    } else {
      cpfInput.setCustomValidity("");
    }
  }, [selectedUser.cpf, cpfValid]);

  useComponentDidUpdate(() => {
    const emailInput = document.getElementById("email");
    if (!emailValid) {
      emailInput.setCustomValidity("O E-mail já foi cadastrado no sistema.");
    } else {
      emailInput.setCustomValidity("");
    }
  }, [emailValid]);

  useComponentDidUpdate(() => {
    const inputRg = document.getElementById("rg");
    const indice = selectedUser.rg.search(/[^\d\.\-]/);
    if (indice === -1) {
      inputRg.setCustomValidity("");
    } else {
      inputRg.setCustomValidity("O RG deve ser válido.");
    }
  }, [selectedUser.rg]);

  if (!selectedUser.id) {
    useComponentDidUpdate(() => {
      const passwordConfirmationInput = document.getElementById(
        "password_confirmation"
      );
      const passwordInput = document.getElementById("password");
      if (
        selectedUser.password_confirmation != selectedUser.password &&
        selectedUser.password_confirmation != "" &&
        selectedUser.password != ""
      ) {
        const msg = "Os passwords devem ser idênticos.";
        passwordConfirmationInput.setCustomValidity(msg);
        passwordInput.setCustomValidity(msg);
      } else {
        passwordConfirmationInput.setCustomValidity("");
        passwordInput.setCustomValidity("");
      }
    }, [selectedUser.password, selectedUser.password_confirmation]);
  }

  // RENDER
  const tituloModal = selectedUser.id ? "Editar Usuário" : "Novo Usuário";
  const emailSpinner = validatingEmail ? <FieldSpinner /> : <></>;
  const cpfSpinner = validatingCpf ? <FieldSpinner /> : <></>;

  const passwordFields = !selectedUser.id ? (
    <>
      <div className="form-group">
        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          className="form-control"
          required
          minLength="6"
          maxLength="191"
          value={selectedUser.password}
          onChange={handleInputChange}
          name="password"
        />
      </div>

      <div className="form-group">
        <label htmlFor="password_confirmation">Confirmar senha</label>
        <input
          type="password"
          id="password_confirmation"
          className="form-control"
          required
          minLength="6"
          maxLength="191"
          value={selectedUser.password_confirmation}
          onChange={handleInputChange}
          name="password_confirmation"
        />
      </div>
    </>
  ) : (
    <></>
  );

  return (
    <div id="form-usuario-modal" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{tituloModal}</h5>
            </div>
            <div className="modal-body">
              {/* CONTEÚDO */}

              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  required
                  maxLength="191"
                  value={selectedUser.name}
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                {emailSpinner}
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  value={selectedUser.email}
                  onChange={handleEmailChange}
                  maxLength="191"
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                {cpfSpinner}
                <input
                  type="cpf"
                  id="cpf"
                  className="form-control"
                  required
                  maxLength="191"
                  value={selectedUser.cpf}
                  onChange={handleCpfChange}
                  name="cpf"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rg">RG</label>
                <input
                  type="rg"
                  id="rg"
                  className="form-control"
                  required
                  maxLength="191"
                  value={selectedUser.rg}
                  onChange={handleInputChange}
                  name="rg"
                />
              </div>

              {passwordFields}

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  checked={!!selectedUser.admin}
                  onChange={handleInputChange}
                  id="admin"
                  name="admin"
                />
                <label className="form-check-label" htmlFor="admin">
                  Administrador
                </label>
              </div>

              {/* FIM DO CONTEÚDO */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleCancelButton}
              >
                Fechar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={validatingEmail || validatingCpf || savingUser}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUsuario;
