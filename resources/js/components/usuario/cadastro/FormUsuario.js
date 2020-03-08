import React, { useReducer, useEffect, useCallback } from "react";

import ValidarCpf from "../../../util/ValidarCpf";
import Axios from "axios";
import FieldSpinner from "../../basic/FieldSpinner";
import usePasswordConfirm from "../../basic/hooks/usePasswordConfirm";

const initialState = {
  showEmailSpinner: false,
  showCpfSpinner: false,
  submitDisabled: false
};

function reducer(state, action) {
  let submitDisabled;
  switch (action.type) {
    case "validating-email":
      return { ...state, showEmailSpinner: true, submitDisabled: true };
    case "email-validated":
      submitDisabled = state.showCpfSpinner;
      return { ...state, showEmailSpinner: false, submitDisabled };
    case "validating-cpf":
      return { ...state, showCpfSpinner: true, submitDisabled: true };
    case "cpf-validated":
      submitDisabled = state.showEmailSpinner;
      return { ...state, showCpfSpinner: false, submitDisabled };
    default:
      throw new Error("invalid action type: " + action.type);
  }
}

const FormUsuario = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { handlePasswordConfirmChange } = usePasswordConfirm(
    "password",
    props.handleInputChange
  );

  // Roda na inicialização
  useEffect(() => {
    $("#form-usuario-modal").modal({
      backdrop: "static",
      show: true
    });

    const inputCpf = document.getElementById("cpf");
    const imCpf = new Inputmask("999.999.999-99");
    imCpf.mask(inputCpf);
  }, []);

  const checkEmailUnique = useCallback(
    _.debounce((email, id, callback, error) => {
      // VERIFICAR SE E-MAIL É ÚNICO
      Axios.get("/verificacoes/usuario/email", {
        params: {
          email: email,
          id: id
        }
      })
        .then(result => {
          if (callback) callback(result.data.unico);
        })
        .catch(err => {
          error(err);
          console.log(err);
        });
    }, 500),
    []
  );

  const checkCpfUnique = useCallback(
    _.debounce((cpf, id, callback, error) => {
      Axios.get("/verificacoes/usuario/cpf", {
        params: {
          cpf,
          id
        }
      })
        .then(result => {
          if (callback) callback(result.data.unico);
        })
        .catch(e => {
          error(e);
          console.error(e);
        });
    }, 500),
    []
  );

  // HANDLERS
  const handleEmailChange = e => {
    e.persist();
    const emailInput = e.target;
    dispatch({ type: "validating-email" });
    props.handleInputChange(e);
    checkEmailUnique(
      emailInput.value,
      props.id,
      unique => {
        if (!unique) {
          emailInput.setCustomValidity(
            "O e-mail já foi cadastrado no sistema."
          );
        } else {
          emailInput.setCustomValidity("");
        }
        dispatch({ type: "email-validated" });
      },
      () => {
        dispatch({ type: "email-validated" });
      }
    );
  };

  const handleCpfChange = e => {
    dispatch({ type: "validating-cpf" });
    e.persist();
    const inputCpf = e.target;
    props.handleInputChange(e);
    checkCpfUnique(
      inputCpf.value,
      props.id,
      unique => {
        if (!unique) {
          inputCpf.setCustomValidity("O cpf já foi cadastrado no sistema.");
        } else if (!ValidarCpf(inputCpf.value)) {
          inputCpf.setCustomValidity("O CPF deve ser válido.");
        } else {
          inputCpf.setCustomValidity("");
        }
        dispatch({ type: "cpf-validated" });
      },
      () => {
        dispatch({ type: "cpf-validated" });
      }
    );
  };

  const handleRgChange = e => {
    e.persist();
    const inputRg = e.target;
    const indice = inputRg.value.search(/[^\d\.\-]/);

    if (indice === -1) {
      inputRg.setCustomValidity("");
    } else {
      inputRg.setCustomValidity("O RG deve ser válido.");
    }

    props.handleInputChange(e);
  };

  const handleSubmit = e => {
    e.persist();
    e.preventDefault();
    props.handleSubmit(() => $("#form-usuario-modal").modal("hide"));
  };

  /** FIM DOS HANDLERS **/

  // RENDER
  const tituloModal = props.user.id ? "Editar Usuário" : "Novo Usuário";
  const emailSpinner = state.showEmailSpinner ? <FieldSpinner /> : <></>;
  const cpfSpinner = state.showCpfSpinner ? <FieldSpinner /> : <></>;

  const passwordFields =
    props.formType == "create" ? (
      <>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            type="password"
            id="password"
            className="form-control"
            required
            minLength="6"
            maxLength="191"
            value={props.password}
            onChange={props.handleInputChange}
            name="password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password_confirmation">Confirmar senha</label>
          <input
            type="password"
            id="password_confirmation"
            className="form-control"
            required
            minLength="6"
            maxLength="191"
            value={props.user.password_confirmation}
            onChange={handlePasswordConfirmChange}
            name="password_confirmation"
          />
        </div>
      </>
    ) : (
      <></>
    );

  return (
    <div id="form-usuario-modal" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{tituloModal}</h5>
            </div>
            <div className="modal-body">
              {/* CONTEÚDO */}

              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  required
                  maxLength="191"
                  value={props.user.name}
                  onChange={props.handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">E-mail</label>
                {emailSpinner}
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  required
                  value={props.user.email}
                  onChange={handleEmailChange}
                  maxLength="191"
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="cpf">CPF</label>
                {cpfSpinner}
                <input
                  type="cpf"
                  id="cpf"
                  className="form-control"
                  required
                  maxLength="191"
                  value={props.user.cpf}
                  onChange={handleCpfChange}
                  name="cpf"
                />
              </div>

              <div className="form-group">
                <label htmlFor="rg">RG</label>
                <input
                  type="rg"
                  id="rg"
                  className="form-control"
                  required
                  maxLength="191"
                  value={props.user.rg}
                  onChange={handleRgChange}
                  name="rg"
                />
              </div>

              {passwordFields}

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value="1"
                  checked={!!props.user.admin}
                  onChange={props.handleInputChange}
                  id="admin"
                  name="admin"
                />
                <label className="form-check-label" htmlFor="admin">
                  Administrador
                </label>
              </div>

              {/* FIM DO CONTEÚDO */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={props.handleCancelButton}
              >
                Fechar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={state.submitDisabled}
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormUsuario;
