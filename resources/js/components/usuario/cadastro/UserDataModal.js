import React from "react";

import Formatter from "../../../util/Formatter";

export default class UserDataModal extends React.Component {
  constructor(props) {
    super(props);

    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);

    this.handleCancelButton = this.handleCancelButton.bind(this);
    this.handleEditUserButton = this.handleEditUserButton.bind(this);
  }

  componentDidMount() {
    this.showModal();
  }

  showModal() {
    $("#show-user-modal").modal("show");
  }

  hideModal() {
    $("#show-user-modal").modal("hide");
  }

  handleCancelButton(e) {
    this.hideModal();
    this.props.handleCancelButton();
  }

  handleEditUserButton(e) {
    this.hideModal();
    this.props.handleCancelButton();
  }

  render() {
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
                <dd className="col-sm-9">{this.props.user.id}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">Nome</dt>
                <dd className="col-sm-9">{this.props.user.name}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">E-mail</dt>
                <dd className="col-sm-9">{this.props.user.email}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">CPF</dt>
                <dd className="col-sm-9">
                  {Formatter.cpfFormat(this.props.user.cpf)}
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">RG</dt>
                <dd className="col-sm-9">{this.props.user.rg}</dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">Criado em</dt>
                <dd className="col-sm-9">
                  {Formatter.dateFormat(this.props.user.created_at)}
                </dd>
              </dl>

              <dl className="row">
                <dt className="col-sm-3">Editado em</dt>
                <dd className="col-sm-9">
                  {Formatter.dateFormat(this.props.user.updated_at)}
                </dd>
              </dl>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleEditUserButton}
              >
                Editar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={this.props.handlePasswordChangeButton}
              >
                Alterar Senha
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleCancelButton}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
