import React from "react";
import { connect } from "react-redux";

import { deleteUser } from "../redux/actions/deleteUserActions";
import { setFetchParams } from "../redux/actions/dataTableActions";
import { showEmptyUserForm } from "../redux/actions/userFormActions";
import { showUserData } from "../redux/actions/userModalActions";

import DataTable from "../components/DataTable";

const mapStateToProps = (state, ownProps) => {
  return {
    records: state.dataTable.data,
    orderParams: state.dataTable.params,
    totalNumRecords: state.dataTable.totalNumRecords,
    fetchingData: state.dataTable.fetchingData
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
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
