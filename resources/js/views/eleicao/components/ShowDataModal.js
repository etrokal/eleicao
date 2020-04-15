import React, { useEffect } from "react";

import Formatter from "../../../util/Formatter";

const ShowDataModal = ({
  showModal,
  data,
  handleCancelButton,
  handleEditUserButton,
  handlePasswordChangeButton
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
            <h5 className="modal-title">Dados do Eleição</h5>
          </div>

          <div className="modal-body">
            <dl className="row">
              <dt className="col-sm-3">Id</dt>
              <dd className="col-sm-9">{data.id}</dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Nome</dt>
              <dd className="col-sm-9">{data.nome}</dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Data Início</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(data.data_inicio)}
              </dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Data Fim</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(data.data_fim)}
              </dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Criado em</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(data.created_at)}
              </dd>
            </dl>

            <dl className="row">
              <dt className="col-sm-3">Editado em</dt>
              <dd className="col-sm-9">
                {Formatter.dateFormat(data.updated_at)}
              </dd>
            </dl>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                handleEditUserButton(data);
              }}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                handlePasswordChangeButton(data);
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

export default ShowDataModal;
