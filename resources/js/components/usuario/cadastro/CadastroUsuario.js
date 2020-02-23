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
      password_confirm: "",
      cpf: "",
      rg: ""
    };

    this.state = {
      mostraFormNovoUsuario: false,
      usuarioSelecionado: this.usuarioVazio
    };
  }

  componentDidMount() {}

  mostraFormNovoUsuario() {
    this.setState({
      mostraFormNovoUsuario: true,
      usuarioSelecionado: this.usuarioVazio
    });
  }

  escondeFormNovoUsuario() {
    this.setState({
      mostraFormNovoUsuario: false
    });
  }

  salvarUsuario(usuario) {
    return new Promise((resolve, reject) => {
      Axios.post("/usuario", usuario)
        .then(result => {
          this.setState({
            usuarioSelecionado: this.data.usuario
          });
          resolve(result.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  render() {
    let formNovoUsuario = this.state.mostraFormNovoUsuario ? (
      <FormUsuario
        usuario={this.state.usuarioSelecionado}
        escondeForm={() => this.escondeFormNovoUsuario()}
        salvarUsuario={usuario => this.salvarUsuario()}
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
