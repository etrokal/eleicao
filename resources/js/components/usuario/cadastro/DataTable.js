import React from "react";
import Swal from "sweetalert2";

import Pagination from "./Pagination";
import Formatter from "../../../util/Formatter";

export default class DataTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.fetchUserList = this.fetchUserList.bind(this);
    this.renderTableLines = this.renderTableLines.bind(this);
  }

  componentDidMount() {
    this.fetchUserList();
  }

  handleShow(element) {
    this.props.handleShow(element);
  }

  handleDelete(element) {
    Swal.fire({
      icon: "warning",
      title: "Excluir Usuário",
      text: "Essa ação não pode ser desfeita!",
      confirmButtonText: "Sim, excluir o usuário!",
      focusConfirm: true,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then(result => {
      if (result.value) {
        this.props.handleDelete(element);
      }
    });
  }

  fetchUserList() {
    this.props.fetchUserList();
  }

  renderTableLines() {
    const usuarios = this.props.usuarios.slice();

    const tableLines = [];
    for(let i = 0; i < usuarios.length; ++i) {
        tableLines.push(
            <tr key={usuarios[i].id}>
              <th scope="row">{usuarios[i].id}</th>
              <td>{usuarios[i].name}</td>
              <td>{usuarios[i].email}</td>
              <td>{Formatter.cpfFormat(usuarios[i].cpf)}</td>
              <td>
                <a
                  href="#"
                  onClick={() => this.handleShow(usuarios[i])}
                  className="btn btn-primary"
                >
                  Ver
                </a>
                <a
                  href="#"
                  onClick={() => this.handleDelete(usuarios[i])}
                  className="btn btn-danger ml-2"
                >
                  Excluir
                </a>
              </td>
            </tr>
          );
    }


    return tableLines;
  }

  render() {
    const tableLines = this.renderTableLines();

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">E-mail</th>
              <th scope="col">CPF</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{tableLines}</tbody>
        </table>
        <Pagination
            offset={this.props.orderParams.offset}
            limit={this.props.orderParams.limit}
            qtdTotal={this.props.qtdRegistros}
            handlePageChange={this.props.handlePageChange}
        />
      </div>
    );
  }
}
