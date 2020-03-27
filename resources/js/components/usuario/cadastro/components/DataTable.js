import React from "react";
import Swal from "sweetalert2";

import Formatter from "../../../../util/Formatter";

import Pagination from "../containers/PaginationContainer";
import QuantitySelector from "./QuantitySelector";
import TextField from "./TextField";
import FieldSpinner from "../../../basic/FieldSpinner";
import BarraDeComandos from "./BarraDeComandos";

const DataTable = ({
  handleParamsChange,
  totalNumRecords,
  records,
  orderParams,
  handleShowUser,
  fetchingData,
  handleNewUser
}) => {
  const renderTableLines = records => {
    if (fetchingData) {
      return (
        <tr>
          <td colSpan="6">
            Carregando registros... <FieldSpinner />
          </td>
        </tr>
      );
    } else if (records.length === 0) {
      return (
        <tr>
          <td colSpan="6">Nenhum registro encontrado.</td>
        </tr>
      );
    }
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
              onClick={() => handleShowUser(records[i])}
              className="btn btn-primary"
            >
              Ver
            </a>
            <a
              href="#"
              onClick={() => handleDelete(records[i])}
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

  const tableLines = renderTableLines(records);
  const numRegistros = records.length + orderParams.offset;
  const pagination = fetchingData ? (
    <></>
  ) : (
    <Pagination
      offset={orderParams.offset}
      limit={orderParams.limit}
      qtdTotal={totalNumRecords}
    />
  );

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-3 col-sm-12">
          <QuantitySelector
            value={orderParams.limit}
            handleQuantityChange={quantity => {
              handleParamsChange({
                limit: quantity
              });
            }}
          />
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">
          <TextField
            value={orderParams.filter}
            handleValueChange={value => {
              handleParamsChange({
                filter: value
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
          Mostrando {numRegistros} de {totalNumRecords}
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">{pagination}</div>
      </div>
      <BarraDeComandos handleNovoUsuario={handleNewUser} />
    </>
  );
};

export default DataTable;
