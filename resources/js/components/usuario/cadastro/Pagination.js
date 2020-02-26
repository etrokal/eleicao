import React, { Component } from "react";
import ReactDOM from "react-dom";

export default class Pagination extends Component {
  constructor(props) {
    super(props);

    this.numberOfPagesBeforeAndAfter = 3;

    this.renderPageNumbers = this.renderPageNumbers.bind(this);
    this.getQtdPaginas = this.getQtdPaginas.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  getQtdPaginas() {
    const limit = this.props.limit;
    const qtdTotal = this.props.qtdTotal;
    const qtdPaginas = Math.ceil(qtdTotal / limit);
    return qtdPaginas;
  }

  getCurrentPage() {
    const offset = this.props.offset;
    const limit = this.props.limit;
    const paginaAtual = Math.floor(offset / limit) + 1;
    return paginaAtual;
  }

  handlePageChange(pageNumber) {
    const limit = this.props.limit;
    const offset = (pageNumber - 1) * limit;

    this.props.handlePageChange(offset, limit);
  }

  renderPageNumbers() {
    const offset = this.props.offset;
    const limit = this.props.limit;
    const qtdTotal = this.props.qtdTotal;

    const qtdPaginas = this.getQtdPaginas();
    const paginaAtual = this.getCurrentPage();

    const numberOfInterations = 2 * this.numberOfPagesBeforeAndAfter + 1;

    const pageNumbers = [];

    // ANTERIOR
    const linkAnterior =
      paginaAtual === 1 ? (
        <li className="page-item" key="-1">
          <span className="page-link text-secondary" >
            Anterior
          </span>
        </li>
      ) : (
        <li className="page-item" key="-1">
          <a
            className="page-link"
            href="#"
            onClick={() => this.handlePageChange(paginaAtual - 1)}
          >
            Anterior
          </a>
        </li>
      );

    pageNumbers.push(linkAnterior);

    for (
      let i = paginaAtual - this.numberOfPagesBeforeAndAfter;
      i <= numberOfInterations;
      ++i
    ) {
      if (i < 1 || i > qtdPaginas) {
        continue;
      }

      pageNumbers.push(
        <li className="page-item" key={i}>
          <a
            className="page-link"
            href="#"
            onClick={() => this.handlePageChange(i)}
          >
            {i}
          </a>
        </li>
      );
    }

    // PRÓXIMO
    const linkProximo =
      paginaAtual === qtdPaginas ? (
        <li className="page-item" key="-2">
          <span className="page-link text-secondary" >
            Próximo
          </span>
        </li>
      ) : (
        <li className="page-item" key="-2">
          <a
            className="page-link"
            href="#"
            onClick={() => this.handlePageChange(paginaAtual + 1)}
          >
            Próximo
          </a>
        </li>
      );

    pageNumbers.push(linkProximo);

    return pageNumbers;
  }

  render() {
    const pages = this.renderPageNumbers();
    const pagination =
      this.props.qtdTotal === 0 ? (
        <div></div>
      ) : (
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">{pages}</ul>
        </nav>
      );
    return <div>{pagination}</div>;
  }
}
