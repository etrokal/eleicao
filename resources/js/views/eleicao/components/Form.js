import React, { useEffect } from "react";
import useComponentDidUpdate from "../../common/hooks/useComponentDidUpdate";
import DateTimeField from "../../common/components/DateTimeField";
import moment from "moment";
import { swalConfirm } from "../../common/helpers/swalHelper";

const Form = ({
  shouldShowForm,
  isSaving,
  data,
  result,
  error,
  datesInPast,

  handleInputChange,
  handleCancelButton,
  handleSubmit
}) => {
  useEffect(() => {
    if (shouldShowForm) {
      $("#form-eleicao-modal").modal({
        backdrop: "static",
        show: true
      });
    } else {
      $("#form-eleicao-modal").modal("hide");
    }

    return () => {
      $("#form-eleicao-modal").modal("hide");
    };
  }, [shouldShowForm, result]);

  useComponentDidUpdate(() => {
    const dataInicio = moment(data.data_inicio);
    const dataFim = moment(data.data_fim);

    const inputDataFim = document.querySelector("[type=date][name=data_fim]");

    if (
      dataInicio.isValid() &&
      dataFim.isValid() &&
      dataFim.isSameOrBefore(dataInicio)
    ) {
      inputDataFim.setCustomValidity(
        "A data fim deve ser posterior à data início."
      );
    } else {
      inputDataFim.setCustomValidity("");
    }
  }, [data.data_inicio, data.data_fim]);

  const thisSubmit = e => {
    e.preventDefault();
    e.persist();

    if (datesInPast) {
      swalConfirm("Ambas as datas estão no passado. Deseja continuar?").then(
        result => {
          if (result) {
            handleSubmit(e);
          }
        }
      );
    } else {
      handleSubmit(e);
    }
  };

  // RENDER
  const tituloModal = data.id ? "Editar Eleição" : "Nova Eleição";

  return (
    <div id="form-eleicao-modal" className="modal" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <form action="" method="POST" onSubmit={thisSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">{tituloModal}</h5>
            </div>
            <div className="modal-body">
              {/* CONTEÚDO */}

              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  type="text"
                  id="nome"
                  className="form-control"
                  required
                  maxLength="191"
                  value={data.nome}
                  onChange={handleInputChange}
                  name="nome"
                />
              </div>

              <DateTimeField
                name="data_inicio"
                label="Data Início"
                value={data.data_inicio}
                handleInputChange={handleInputChange}
              />

              <DateTimeField
                name="data_fim"
                label="Data Fim"
                value={data.data_fim}
                handleInputChange={handleInputChange}
              />

              {/* FIM DO CONTEÚDO */}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancelButton}
              >
                Fechar
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
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

export default Form;
