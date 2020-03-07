import React, { useCallback } from "react";
import Swal from "sweetalert2";
import produce from "immer";

import Pagination from "./Pagination";
import Formatter from "../../../util/Formatter";
import QuantitySelector from "./QuantitySelector";
import TextField from "./TextField";

// class DataTablea extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   handleShow = element => {
//     this.props.handleShow(element);
//   };

//   handleDelete = element => {
//     fetchUserList = () => {
//       this.props.fetchUserList();
//     };

//     renderTableLines = () => {
//       const rows = this.props.rows.slice();

//       const tableLines = [];
//       for (let i = 0; i < rows.length; ++i) {
//         tableLines.push(
//           <tr key={rows[i].id}>
//             <th scope="row">{rows[i].id}</th>
//             <td>{rows[i].name}</td>
//             <td>{rows[i].email}</td>
//             <td>{Formatter.cpfFormat(rows[i].cpf)}</td>
//             <td>
//               <a
//                 href="#"
//                 onClick={() => this.handleShow(rows[i])}
//                 className="btn btn-primary"
//               >
//                 Ver
//               </a>
//               <a
//                 href="#"
//                 onClick={() => this.handleDelete(rows[i])}
//                 className="btn btn-danger ml-2"
//               >
//                 Excluir
//               </a>
//             </td>
//           </tr>
//         );
//       }

//       return tableLines;
//     };

//     render = () => {
//       const tableLines = this.renderTableLines();
//       const numRegistros =
//         this.props.usuarios.length + this.props.orderParams.offset;

//       return (
//         <div>
//           <div className="row mb-2">
//             <div className="col-md-3 col-sm-12">
//               <QuantitySelector
//                 quantity={this.props.orderParams.limit}
//                 handleQuantityChange={this.props.handleLimitChange}
//               />
//             </div>
//             <div className="offset-md-5 col-md-4 col-sm-12">
//               <TextField
//                 value={this.props.orderParams.filter}
//                 handleValueChange={this.props.handleFilterChange}
//                 placeholder="Filtrar Registros"
//               />
//             </div>
//           </div>

//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">ID</th>
//                 <th scope="col">Nome</th>
//                 <th scope="col">E-mail</th>
//                 <th scope="col">CPF</th>
//                 <th scope="col"></th>
//               </tr>
//             </thead>
//             <tbody>{tableLines}</tbody>
//           </table>
//           <div className="row mt-2">
//             <div className="col-md-3 col-sm-12">
//               Mostrando {numRegistros} de {this.props.qtdRegistros}
//             </div>
//             <div className="offset-md-5 col-md-4 col-sm-12">
//               <Pagination
//                 offset={this.props.orderParams.offset}
//                 limit={this.props.orderParams.limit}
//                 qtdTotal={this.props.qtdRegistros}
//                 handlePageChange={this.props.handlePageChange}
//               />
//             </div>
//           </div>
//         </div>
//       );
//     };
//   };
// }

const DataTable = props => {
  const handleDelete = obj => {
    Swal.fire({
      icon: "warning",
      title: "Excluir Usuário",
      text: "Essa ação não pode ser desfeita!",
      confirmButtonText: "Sim, excluir o usuário!",
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6"
    }).then(result => {
      if (result.value) {
        props.handleDelete(obj);
      }
    });
  };

  const renderTableLines = records => {
    const tableLines = [];
    for (let i = 0; i < records.length; ++i) {
      tableLines.push(
        <tr key={records[i].id}>
          <th scope="row">{records[i].id}</th>
          <td>{records[i].name}</td>
          <td>{records[i].email}</td>
          <td>{Formatter.cpfFormat(records[i].cpf)}</td>
          <td>{records[i].admin ? "Sim" : "Não"}</td>
          <td>
            <a
              href="#"
              onClick={() => props.handleShowModal(records[i])}
              className="btn btn-primary"
            >
              Ver
            </a>
            <a
              href="#"
              onClick={() => props.handleDelete(records[i])}
              className="btn btn-danger ml-2"
            >
              Excluir
            </a>
          </td>
        </tr>
      );
    }
    return tableLines;
  };

  const tableLines = renderTableLines(props.records);
  const numRegistros = props.records.length + props.orderParams.offset;

  return (
    <div>
      <div className="row mb-2">
        <div className="col-md-3 col-sm-12">
          <QuantitySelector
            value={props.orderParams.limit}
            handleQuantityChange={quantity => {
              props.paramsDispatch({
                type: "set-param-limit",
                payload: quantity
              });
            }}
          />
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">
          <TextField
            value={props.orderParams.filter}
            handleValueChange={value => {
              props.paramsDispatch({
                type: "set-param-filter",
                payload: value
              });
            }}
            placeholder="Filtrar Registros"
          />
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Nome</th>
            <th scope="col">E-mail</th>
            <th scope="col">CPF</th>
            <th scope="col">Administrador?</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{tableLines}</tbody>
      </table>
      <div className="row mt-2">
        <div className="col-md-3 col-sm-12">
          Mostrando {numRegistros} de {props.totalNumRecords}
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">
          <Pagination
            offset={props.orderParams.offset}
            limit={props.orderParams.limit}
            qtdTotal={props.totalNumRecords}
            paramsDispatch={props.paramsDispatch}
          />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
