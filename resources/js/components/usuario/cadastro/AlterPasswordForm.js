import React, { useEffect } from "react";

import usePasswordConfirm from "../../basic/hooks/usePasswordConfirm";
import Formatter from "../../../util/Formatter";

const AlterPasswordForm = props => {
  const { handlePasswordConfirmChange } = usePasswordConfirm(
    "password",
    props.handleInputChange
  );

  useEffect(() => {
    $("#form-password-modal").modal({
      backdrop: "static",
      show: true
    });
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    props.handleSubmit(() => $("#form-password-modal").modal("hide"));
  };

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
              <input type="hidden" name="id" value={props.inputData.id} />
              <div className="modal-header">
                <h5 className="modal-title">Alteração de Senha</h5>
              </div>
              <div className="modal-body">
                <div>
                  <dl className="row">
                    <dt className="col-sm-3">Id</dt>
                    <dd className="col-sm-9">{props.inputData.id}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">Nome</dt>
                    <dd className="col-sm-9">{props.inputData.name}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">E-mail</dt>
                    <dd className="col-sm-9">{props.inputData.email}</dd>
                  </dl>

                  <dl className="row">
                    <dt className="col-sm-3">CPF</dt>
                    <dd className="col-sm-9">
                      {Formatter.cpfFormat(props.inputData.cpf)}
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
                    value={props.inputData.password}
                    onChange={props.handleInputChange}
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
                    value={props.inputData.password_confirmation}
                    onChange={handlePasswordConfirmChange}
                    name="password_confirmation"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={props.handleCancelButton}
                >
                  Fechar
                </button>
                <button type="submit" className="btn btn-primary">
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
