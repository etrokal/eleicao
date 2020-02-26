import React from "react";
import ReactDOM from "react-dom";

import BarraDeComandos from "./BarraDeComandos";
import FormUsuario from "./FormUsuario";
import DataTable from "./DataTable";
import UserDataModal from "./UserDataModal";

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
      mostraFormUsuario: false,
      usuarioSelecionado: this.usuarioVazio,
      usuarios: [],
      qtdUsuarios: 0,
      orderParams: {
        orderBy: "id",
        orderAsc: true,
        offset: 0,
        limit: 15,
        filter: ""
      },
      showUserDataModal: false
    };

    this.fetchUserList = this.fetchUserList.bind(this);

    this.mostraFormUsuario = this.mostraFormUsuario.bind(this);
    this.escondeFormUsuario = this.escondeFormUsuario.bind(this);
    this.showUserDataModal = this.showUserDataModal.bind(this);
    this.hideUserDataModal = this.hideUserDataModal.bind(this);

    this.handleAxiosError = this.handleAxiosError.bind(this);
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

    this.handleShowUser = this.handleShowUser.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {}

  fetchUserList() {
    Axios.get("/usuario/list", {
      params: {
        offset: this.state.orderParams.offset,
        limit: this.state.orderParams.limit,
        orderBy: this.state.orderParams.orderBy,
        orderAsc: this.state.orderParams.orderAsc,
        filter: this.state.orderParams.filter
      }
    })
      .then(result => {
        this.setState({
          usuarios: result.data.users,
          qtdUsuarios: result.data.qtdTotal
        });
      })
      .catch(this.handleAxiosError);
  }

  handleAxiosError(error) {
    console.log(error);
  }

  // HANDLERS FORM USUARIO
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
        this.setState({
          usuarioSelecionado: Object.assign(this.usuarioVazio, result.data)
        });
        this.escondeFormUsuario();
        this.fetchUserList();
        toastr.success("Usuário salvo com sucesso!");
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

  // HANDLERS DATA TABLE
  handleShowUser(user) {
    const usuarioVazio = Object.assign({}, this.usuarioVazio);

    this.setState({
      usuarioSelecionado: Object.assign(usuarioVazio, user)
    });
    this.showUserDataModal();
  }

  handlePageChange(offset, limit) {
    const orderParams = Object.assign({}, this.state.orderParams);
    orderParams.offset = offset;
    orderParams.limit = limit;

    this.setState(
      {
        orderParams: orderParams
      },
      () => this.fetchUserList()
    );
  }

  // INTERFACE CHANGES
  mostraFormUsuario() {
    this.setState({
      mostraFormUsuario: true,
      usuarioSelecionado: Object.assign({}, this.usuarioVazio)
    });
  }

  escondeFormUsuario() {
    this.setState({
      mostraFormUsuario: false
    });
  }

  showUserDataModal() {
    this.setState({
      showUserDataModal: true
    });
  }

  hideUserDataModal() {
    this.setState({
      showUserDataModal: false
    });
  }

  render() {
    const formUsuario = this.state.mostraFormUsuario ? (
      <FormUsuario
        usuario={this.state.usuarioSelecionado}
        escondeForm={this.escondeFormUsuario}
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

    const userDataModal = this.state.showUserDataModal ? (
      <UserDataModal
        user={this.state.usuarioSelecionado}
        handleEditUserButton={this.handleEditUserButton}
        handlePasswordChangeButton={this.handlePasswordChangeButton}
        handleCancelButton={this.hideUserDataModal}
      />
    ) : (
      <div></div>
    );

    return (
      <div className="container">
        <form>
          {/* <BarraDeBusca /> */}
          <DataTable
            usuarios={this.state.usuarios}
            handleShow={this.handleShowUser}
            fetchUserList={this.fetchUserList}
            orderParams={this.state.orderParams}
            handlePageChange={this.handlePageChange}
            qtdRegistros={this.state.qtdUsuarios}
          />
          <div className="form-group">
            <BarraDeComandos novoUsuario={() => this.mostraFormUsuario()} />
          </div>
        </form>
        {formUsuario}
        {userDataModal}
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
