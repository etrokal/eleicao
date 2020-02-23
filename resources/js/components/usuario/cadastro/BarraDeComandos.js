import React from "react";

class BarraDeComandos extends React.Component {
  render() {
    return (
      <div>
        <button
            className="btn btn-primary"
            type="button"
            onClick={() => this.props.novoUsuario()}
        >
          Novo Usuário
        </button>
      </div>
    );
  }
}

export default BarraDeComandos;
