import React from "react";
import Swal from "sweetalert2";

import Formatter from "../../../util/Formatter";

import Pagination from "../containers/PaginationContainer";
import QuantitySelector from "../../common/components/QuantitySelector";
import TextField from "../../common/components/TextField";
import FieldSpinner from "../../common/components/FieldSpinner";
import Commandbar from "../../common/components/Commandbar";
import TableHeader from "../../common/components/TableHeader";

const DataTable = ({
  totalNumRecords,
  records,
  orderParams,
  fetchingData,
  error,

  handleRetryFetch,
  handleParamsChange,
  handleNewUser,
  handleShowUser
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
    }

    if (error) {
      return (
        <tr>
          <td colSpan="6">
            {error.msg}{" "}
            <a
              href=""
              onClick={e => {
                e.preventDefault();
                handleRetryFetch();
              }}
            >
              Tente novamente
            </a>
          </td>
        </tr>
      );
    }

    if (records.length === 0) {
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
          <TableHeader
            orderBy={orderParams.orderBy}
            orderAsc={orderParams.orderAsc}
            headers={[
              { field: "id", label: "Id" },
              { field: "name", label: "Nome" },
              { field: "email", label: "E-mail" },
              { field: "cpf", label: "CPF" },
              { field: "admin", label: "Administrador?" }
            ]}
            handleHeaderChange={(orderBy, orderAsc) => {
              handleParamsChange({ orderBy, orderAsc });
            }}
            showActionColumn={true}
            actionColumnLabel="Ações"
          />
        </thead>
        <tbody>{tableLines}</tbody>
      </table>
      <div className="row mt-2">
        <div className="col-md-3 col-sm-12">
          Mostrando {numRegistros} de {totalNumRecords}
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">{pagination}</div>
      </div>
      <Commandbar
        handleNovoUsuario={handleNewUser}
        newRecordLabel="Novo Usuário"
      />
    </>
  );
};

export default DataTable;
