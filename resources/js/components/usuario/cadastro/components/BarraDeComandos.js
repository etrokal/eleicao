import React from "react";

const BarraDeComandos = ({ handleNovoUsuario }) => {
  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => handleNovoUsuario()}
      >
        Novo Usuário
      </button>
    </div>
  );
};

export default BarraDeComandos;
