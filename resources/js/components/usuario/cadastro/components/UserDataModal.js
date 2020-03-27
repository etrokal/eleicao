import React, { useEffect } from "react";

import Formatter from "../../../../util/Formatter";

const UserDataModal = ({
  showModal,
  handleCancelButton,
  handleEditUserButton,
  handlePasswordChangeButton,
  selectedUser
}) => {
  useEffect(() => {
    if (showModal) {
      $("#show-user-modal").modal({ backdrop: "static", show: true });
    } else {
      $("#show-user-modal").modal("hide");
    }
    return () => {
      $("#show-user-modal").modal("hide");
    };
  }, [showModal]);

  return (
    <div id="show-user-modal" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Dados do Usuário</h5>
          </div>

          <div className="modal-body">
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
                {Formatter.cpfFormat(selectedUser.cpf) || ""}
              </dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">RG</dt>
              <dd className="col-sm-9">{selectedUser.rg}</dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">É Admin?</dt>
              <dd className="col-sm-9">{selectedUser.admin ? "Sim" : "Não"}</dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Criado em</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(selectedUser.created_at)}
              </dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Editado em</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(selectedUser.updated_at)}
              </dd>
            </dl>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleEditUserButton(selectedUser);
              }}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                handlePasswordChangeButton(selectedUser);
              }}
            >
              Alterar Senha
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={handleCancelButton}
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataModal;
