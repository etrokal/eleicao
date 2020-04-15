import React, { Component } from "react";
import ReactDOM from "react-dom";

const numberOfPagesBeforeAndAfter = 3;

const Pagination = ({ handleOffsetChange, limit, offset, totalNumRecords }) => {
  const getQtdPaginas = () => {
    const qtdPaginas = Math.ceil(totalNumRecords / limit);
    return qtdPaginas;
  };

  const getCurrentPage = () => {
    const currentPage = Math.floor(offset / limit) + 1;
    return currentPage;
  };

  const handlePageChange = pageNumber => {
    const offset = (pageNumber - 1) * limit;

    handleOffsetChange(offset);
  };

  const renderPageNumbers = () => {
    const qtdPaginas = getQtdPaginas();
    const paginaAtual = getCurrentPage();

    const numberOfIterations = 2 * numberOfPagesBeforeAndAfter + 1;

    const pageNumbers = [];

    // ANTERIOR
    const linkAnterior =
      paginaAtual === 1 ? (
        <li className="page-item" key="-1">
          <span className="page-link text-secondary">Anterior</span>
        </li>
      ) : (
        <li className="page-item" key="-1">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(paginaAtual - 1)}
          >
            Anterior
          </a>
        </li>
      );

    pageNumbers.push(linkAnterior);

    for (
      let i = paginaAtual - numberOfPagesBeforeAndAfter;
      i <= numberOfIterations;
      ++i
    ) {
      if (i < 1 || i > qtdPaginas) {
        continue;
      }

      const ativo = paginaAtual === i ? "active" : "";
      pageNumbers.push(
        <li className={"page-item " + ativo} key={i}>
          <a className="page-link" href="#" onClick={() => handlePageChange(i)}>
            {i}
          </a>
        </li>
      );
    }

    // PRÓXIMO
    const linkProximo =
      paginaAtual === qtdPaginas ? (
        <li className="page-item" key="-2">
          <span className="page-link text-secondary">Próximo</span>
        </li>
      ) : (
        <li className="page-item" key="-2">
          <a
            className="page-link"
            href="#"
            onClick={() => handlePageChange(paginaAtual + 1)}
          >
            Próximo
          </a>
        </li>
      );

    pageNumbers.push(linkProximo);

    return pageNumbers;
  };

  const pages = renderPageNumbers();
  const pagination =
    totalNumRecords === 0 ? (
      <></>
    ) : (
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center">{pages}</ul>
      </nav>
    );
  return <div>{pagination}</div>;
};

export default Pagination;
