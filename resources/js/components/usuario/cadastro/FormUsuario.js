import React from "react";
import ValidarCpf from "../../../util/cpf";
import Axios from "axios";
import FieldSpinner from "../../basic/FieldSpinner";

export default class FormUsuario extends React.Component {
  // TODO: Adicionar foto

  constructor(props) {
    super(props);

    this.state = {
      showEmailSpinner: false,
      showCpfSpinner: false
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleCpfChange = this.handleCpfChange.bind(this);
    this.handleRgChange = this.handleRgChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePasswordConfirmChange = this.handlePasswordConfirmChange.bind(
      this
    );
    this.handleAdmin = this.handleAdmin.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    $("#form-usuario-modal").modal("show");

    const inputCpf = document.getElementById("cpf");
    const imCpf = new Inputmask("999.999.999-99");
    imCpf.mask(inputCpf);
  }

  // EVENT HANDLERS
  handleNameChange(e) {
    this.props.handleNameChange(e.target.value);
  }

  handleEmailChange(e) {
    const emailInput = e.target;
    this.desabilitaSubmit();
    this.showEmailSpinner();

    // VERIFICAR SE E-MAIL É ÚNICO
    Axios.get("/verificacoes/usuario/email", {
      params: {
        email: emailInput.value,
        id: this.props.usuario.id
      }
    })
      .then(result => {
        if (!result.data.unico) {
          emailInput.setCustomValidity(
            "O e-mail já foi cadastrado no sistema."
          );
        } else {
          emailInput.setCustomValidity("");
        }
      })
      .catch(console.log)
      .finally(() => {
        this.habilitaSubmit();
        this.hideEmailSpinner();
      });

    this.props.handleEmailChange(emailInput.value);
  }

  handleCpfChange(e) {
    const inputCpf = e.target;
    this.desabilitaSubmit();
    this.showCpfSpinner();

    // VERIFICAR SE CPF É ÚNICO E VALIDAR CPF
    Axios.get("/verificacoes/usuario/cpf", {
      params: {
        cpf: inputCpf.value,
        id: this.props.usuario.id
      }
    })
      .then(result => {
        if (!result.data.unico) {
          inputCpf.setCustomValidity("O cpf já foi cadastrado no sistema.");
        } else if (!ValidarCpf(inputCpf.value)) {
          inputCpf.setCustomValidity("O CPF deve ser válido.");
        } else {
          inputCpf.setCustomValidity("");
        }
      })
      .catch(console.log)
      .finally(() => {
        this.habilitaSubmit();
        this.hideCpfSpinner();
      });

    this.props.handleCpfChange(inputCpf.value);
  }

  handleRgChange(e) {
    const inputRg = e.target;
    const indice = inputRg.value.search(/[^\d\.\-]/);

    if (indice === -1) {
      inputRg.setCustomValidity("");
    } else {
      inputRg.setCustomValidity("O RG deve ser válido.");
    }

    this.props.handleRgChange(inputRg.value);
  }

  handlePasswordChange(e) {
    this.props.handlePasswordChange(e.target.value);
  }

  handlePasswordConfirmChange(e) {
    const inputPassword = document.getElementById("password");
    const inputPasswordConfirm = e.target;

    if (inputPassword.value === inputPasswordConfirm.value) {
      inputPasswordConfirm.setCustomValidity("");
    } else {
      inputPasswordConfirm.setCustomValidity("As senhas devem ser iguais");
    }

    this.props.handlePasswordConfirmChange(inputPasswordConfirm.value);
  }

  handleAdmin(e) {
    this.props.handleAdmin(e.target.checked);
  }

  handleSubmit(e) {
    e.preventDefault();
    $("#form-usuario-modal").modal("hide");
    this.props.handleSubmit();
  }

  /** FIM DOS HANDLERS */

  // INTERFACE CHANGES
  showEmailSpinner() {
    this.setState({
      showEmailSpinner: true
    });
  }

  hideEmailSpinner() {
    this.setState({
      showEmailSpinner: false
    });
  }

  showCpfSpinner() {
    this.setState({
      showCpfSpinner: true
    });
  }

  hideCpfSpinner() {
    this.setState({
      showCpfSpinner: false
    });
  }

  desabilitaSubmit() {
    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.disabled = true;
  }

  habilitaSubmit() {
    const submitBtn = document.querySelector("button[type=submit]");
    submitBtn.disabled = false;
  }

  render() {
    const tituloModal = this.props.usuario.id
      ? "Editar Usuário"
      : "Novo Usuário";

    const emailSpinner = this.state.showEmailSpinner ? (
      <FieldSpinner />
    ) : (
      <span></span>
    );

    const cpfSpinner = this.state.showCpfSpinner ? (
      <FieldSpinner />
    ) : (
      <span></span>
    );

    return (
      <div
        id="form-usuario-modal"
        className="modal"
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <form action="" method="POST" onSubmit={this.handleSubmit}>
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
                    value={this.props.usuario.name}
                    onChange={this.handleNameChange}
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
                    value={this.props.usuario.email}
                    onChange={this.handleEmailChange}
                    maxLength="191"
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
                    value={this.props.usuario.cpf}
                    onChange={this.handleCpfChange}
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
                    value={this.props.usuario.rg}
                    onChange={this.handleRgChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Senha</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    required
                    minLength="6"
                    maxLength="191"
                    value={this.props.usuario.password}
                    onChange={this.handlePasswordChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password-confirm">Confirmar senha</label>
                  <input
                    type="password"
                    id="password-confirm"
                    className="form-control"
                    required
                    minLength="6"
                    maxLength="191"
                    value={this.props.usuario.password_confirmation}
                    onChange={this.handlePasswordConfirmChange}
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value="1"
                    checked={!!this.props.usuario.admin}
                    onChange={this.handleAdmin}
                    id="admin"
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
                  onClick={() => this.props.escondeForm()}
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
    );
  }
}
