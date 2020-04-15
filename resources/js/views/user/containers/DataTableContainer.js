import { connect } from "react-redux";

import { deleteUser } from "../../../redux/actions/deleteUserActions";
import {
  setFetchParams,
  fetchUsers
} from "../../../redux/actions/userDataTableActions";
import { showEmptyUserForm } from "../../../redux/actions/userFormActions";
import { showUserData } from "../../../redux/actions/userModalActions";

import DataTable from "../components/DataTable";

const mapStateToProps = (state, ownProps) => {
  return {
    records: state.userDataTable.data,
    orderParams: state.userDataTable.params,
    totalNumRecords: state.userDataTable.totalNumRecords,
    fetchingData: state.userDataTable.fetchingData,
    error: state.userDataTable.error
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleDelete: user => {
      Swal.fire({
        icon: "warning",
        title: "Excluir Usuário",
        text: "Essa ação não pode ser desfeita!",
        confirmButtonText: "Sim, excluir o usuário!",
        focusConfirm: false,
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6"
      }).then(result => {
        if (result.value) {
          dispatch(deleteUser(user));
        }
      });
    },
    handleParamsChange: newParams => {
      dispatch(setFetchParams(newParams));
    },
    handleNewUser: e => {
      dispatch(showEmptyUserForm());
    },
    handleShowUser: user => {
      dispatch(showUserData(user));
    },
    handleRetryFetch: () => {
      dispatch(fetchUsers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
