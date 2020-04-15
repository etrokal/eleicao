import { connect } from "react-redux";

import {
  fetchData,
  setFetchParams,
  deleteRecord,
  getDataSelector,
  getParamsSelector,
  getTotalSelector,
  getIsFetchingSelector,
  getErrorSelector
} from "../../../redux/modules/eleicaoDataTable";

import { showEmptyForm } from "../../../redux/modules/eleicaoForm";
import { showModal } from "../../../redux/modules/eleicaoShowModal";

import DataTable from "../components/DataTable";

const mapStateToProps = state => {
  return {
    records: getDataSelector(state),
    params: getParamsSelector(state),
    total: getTotalSelector(state),
    isFetchingData: getIsFetchingSelector(state),
    error: getErrorSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleDelete: eleicao => {
      Swal.fire({
        icon: "warning",
        title: "Excluir Eleição",
        text: "Essa ação não pode ser desfeita!",
        confirmButtonText: "Sim, excluir o usuário!",
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      }).then(result => {
        if (result.value) {
          dispatch(deleteRecord(eleicao));
        }
      });
    },
    handleParamsChange: newParams => {
      dispatch(setFetchParams(newParams));
    },
    handleNew: e => {
      dispatch(showEmptyForm());
    },
    handleShow: eleicao => {
      dispatch(showModal(eleicao));
    },
    handleRetryFetch: () => {
      dispatch(fetchData());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
