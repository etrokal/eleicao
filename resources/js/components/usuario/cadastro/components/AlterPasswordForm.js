import React, { useEffect } from "react";

import useComponentDidUpdate from "../../../basic/hooks/useComponentDidUpdate";
import Formatter from "../../../../util/Formatter";
import Swal from "sweetalert2";

const AlterPasswordForm = ({
  handleSubmit,
  selectedUser,
  showModal,
  handleInputChange,
  changingPassword,
  handleCancelButton,
  result
}) => {
  useEffect(() => {
    if (showModal) {
      $("#form-password-modal").modal({
        backdrop: "static",
        show: true
      });
    } else {
      $("#form-password-modal").modal("hide");
    }
    return () => {
      $("#form-password-modal").modal("hide");
    };
  }, [showModal]);

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

  useComponentDidUpdate(() => {
    if (result) {
      Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Os dados foram salvos com sucesso.",
        showConfirmButton: false,
        timer: 1000
      });
    }
  }, [result]);

  return (
    <>
      <div
        id="form-password-modal"
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form action="" method="POST" onSubmit={handleSubmit}>
              <input type="hidden" name="id" value={selectedUser.id} />
              <div className="modal-header">
                <h5 className="modal-title">Alteração de Senha</h5>
              </div>
              <div className="modal-body">
                <div>
                  <dl className="row">
                    <dt className="col-sm-3">Id</dt>
                    <dd className="col-sm-9">{selectedUser.id}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Nome</dt>
                    <dd className="col-sm-9">{selectedUser.name}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">E-mail</dt>
                    <dd className="col-sm-9">{selectedUser.email}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">CPF</dt>
                    <dd className="col-sm-9">
                      {Formatter.cpfFormat(selectedUser.cpf)}
                    </dd>
                  </dl>
                </div>

                <div className="form-group">
                  <label htmlFor="password">Nova Senha</label>
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
                  <label htmlFor="password_confirmation">
                    Confirmar nova senha
                  </label>
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
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancelButton}
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={changingPassword}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlterPasswordForm;
