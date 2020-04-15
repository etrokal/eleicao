import React from "react";

import Pagination from "../containers/PaginationContainer";
import QuantitySelector from "../../common/components/QuantitySelector";
import TextField from "../../common/components/TextField";
import FieldSpinner from "../../common/components/FieldSpinner";
import Commandbar from "../../common/components/Commandbar";
import TableHeader from "../../common/components/TableHeader";

const DataTable = ({
  total,
  records,
  params,
  isFetchingData,
  error,

  handleRetryFetch,
  handleParamsChange,
  handleNew,
  handleShow,
  handleDelete
}) => {
  const renderTableLines = records => {
    if (isFetchingData) {
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

    const tableLines = records.map(value => (
      <tr key={value.id}>
        <th scope="row">{value.id}</th>
        <td>{value.nome}</td>
        <td>{value.data_inicio}</td>
        <td>{value.data_fim}</td>
        <td>
          <a
            href="#"
            onClick={() => handleShow(value)}
            className="btn btn-primary"
          >
            Ver
          </a>
          <a
            href="#"
            onClick={() => handleDelete(value)}
            className="btn btn-danger ml-2"
          >
            Excluir
          </a>
        </td>
      </tr>
    ));

    return tableLines;
  };

  const tableLines = renderTableLines(records);
  const numRegistros = records.length + params.offset;
  const pagination = isFetchingData ? <></> : <Pagination />;

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-3 col-sm-12">
          <QuantitySelector
            value={params.limit}
            handleQuantityChange={quantity => {
              handleParamsChange({
                limit: quantity
              });
            }}
          />
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">
          <TextField
            value={params.filter}
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
            orderBy={params.orderBy}
            orderAsc={params.orderAsc}
            headers={[
              { field: "id", label: "Id" },
              { field: "nome", label: "Nome" },
              { field: "data_inicio", label: "Data Início" },
              { field: "data_fim", label: "Data Fim" }
            ]}
            showActionColumn={true}
            handleHeaderChange={(orderBy, orderAsc) => {
              handleParamsChange({ orderBy, orderAsc });
            }}
          />
        </thead>
        <tbody>{tableLines}</tbody>
      </table>
      <div className="row mt-2">
        <div className="col-md-3 col-sm-12">
          Mostrando {numRegistros} de {total}
        </div>
        <div className="offset-md-5 col-md-4 col-sm-12">{pagination}</div>
      </div>
      <Commandbar handleNew={handleNew} newRecordLabel="Nova Eleição" />
    </>
  );
};

export default DataTable;
