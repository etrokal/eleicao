import React from "react";
import ReactDOM from "react-dom";

import BarraDeComandos from "./BarraDeComandos";
import FormUsuario from "./FormUsuario";
import Axios from "axios";

class CadastroUsuario extends React.Component {
  constructor(props) {
    super(props);

    this.usuarioVazio = {
      id: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      cpf: "",
      rg: "",
      admin: false
    };

    this.state = {
      mostraFormNovoUsuario: false,
      usuarioSelecionado: this.usuarioVazio
    };

    this.mostraFormNovoUsuario = this.mostraFormNovoUsuario.bind(this);
    this.escondeFormNovoUsuario = this.escondeFormNovoUsuario.bind(this);
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



  // HANDLERS USUARIO
  handleNameChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.name = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handleEmailChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.email = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handleCpfChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.cpf = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handleRgChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.rg = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handlePasswordChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.password = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handlePasswordConfirmChange(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.password_confirmation = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handleAdmin(value) {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    usuarioSelecionado.admin = value;

    this.setState({
      usuarioSelecionado
    });
  }

  handleSubmit() {
    Axios.post("/usuario", this.state.usuarioSelecionado)
      .then(result => {
        const usuarioSelecionado = this.state.usuarioSelecionado;

        this.setState({
          usuarioSelecionado: Object.assign(usuarioSelecionado, result.data)
        });

        this.escondeFormNovoUsuario();
        toastr.success("Usuário salvo com sucesso!");
        // TODO: atualizar lista de usuários
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Ocorreu um erro ao salvar o usuário"
        });
        console.log(error);
      });
  }

  // INTERFACE CHANGES
  mostraFormNovoUsuario() {
    const usuarioSelecionado = this.state.usuarioSelecionado;
    this.setState({
      mostraFormNovoUsuario: true,
      usuarioSelecionado: Object.assign({}, this.usuarioVazio)
    });
  }

  escondeFormNovoUsuario() {
    this.setState({
      mostraFormNovoUsuario: false
    });
  }

  render() {
    let formNovoUsuario = this.state.mostraFormNovoUsuario ? (
      <FormUsuario
        usuario={this.state.usuarioSelecionado}
        escondeForm={this.escondeFormNovoUsuario}
        handleNameChange={this.handleNameChange}
        handleEmailChange={this.handleEmailChange}
        handleCpfChange={this.handleCpfChange}
        handleRgChange={this.handleRgChange}
        handlePasswordChange={this.handlePasswordChange}
        handlePasswordConfirmChange={this.handlePasswordConfirmChange}
        handleAdmin={this.handleAdmin}
        handleSubmit={this.handleSubmit}
      />
    ) : (
      <div></div>
    );

    return (
      <div className="container">
        <form>
          {/* <BarraDeBusca /> */}
          {/* <ListaDeUsusarios /> */}
          <div className="form-group">
            <BarraDeComandos novoUsuario={() => this.mostraFormNovoUsuario()} />
          </div>
        </form>
        {formNovoUsuario}
      </div>
    );
  }
}

export default CadastroUsuario;

if (document.getElementById("cadastro-usuario-app")) {
  ReactDOM.render(
    <CadastroUsuario />,
    document.getElementById("cadastro-usuario-app")
  );
}
