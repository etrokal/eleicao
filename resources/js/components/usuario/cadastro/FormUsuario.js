import React from "react";
import ValidarCpf from "../../../util/cpf";

export default class FormUsuario extends React.Component {
  // TODO: Adicionar foto

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.usuario.id,
      name: this.props.usuario.name,
      email: this.props.usuario.email,
      password: "",
      password_confirm: "",
      cpf: this.props.usuario.cpf,
      rg: this.props.usuario.rg
    };
  }

  componentDidMount() {
    $("#form-usuario-modal").modal("show");
    // this.validarCpf();
  }

  validarCpf() {
    // Validar CPF
    if (!ValidarCpf(this.state.cpf)) {
      const inputCpf = document.getElementById("cpf");
      inputCpf.setCustomValidity("O CPF deve ser válido.");
    } else {
      const inputCpf = document.getElementById("cpf");
      inputCpf.setCustomValidity("");
    }
  }

  getUsuario() {
    const usuario = {
      id: this.state.id,
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
      cpf: this.state.cpf,
      rg: this.state.rg
    };
    return usuario;
  }

  submit() {
    this.props.salvarUsuario(this.getUsuario());
  }

  render() {
    const tituloModal = this.state.id ? "Editar Usuário" : "Novo Usuário";

    return (
      <div
        id="form-usuario-modal"
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form action="" method="POST">
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
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                    maxLength="191"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpf">CPF</label>
                  <input
                    type="cpf"
                    id="cpf"
                    className="form-control"
                    required
                    maxLength="191"
                    onInput={() => this.validarCpf()}
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
                    onInput={() => this.validarCpf()}
                  />
                </div>

                {/* FIM DO CONTEÚDO */}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={() => this.props.escondeForm()}
                >
                  Fechar
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={() => this.submit()}
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
