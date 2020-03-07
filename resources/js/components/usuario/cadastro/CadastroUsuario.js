import React, { useState, useEffect, useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import produce from "immer";

// HOOKS
import useForm from "./hooks/useForm";
import useDataFetcher from "./hooks/useDataFetcher";
import useDeleter from "./hooks/useDeleter";

// COMPONENTS
import BarraDeComandos from "./BarraDeComandos";
import FormUsuario from "./FormUsuario";
import DataTable from "./DataTable";
import UserDataModal from "./UserDataModal";

import Axios from "axios";

// TODO: Falta terminar a edição, ordenação e exclusão

const initialState = {
  shouldShowModal: false,
  shouldShowForm: false,
  formType: "create",
  modalUser: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "show-modal":
      return {
        ...state,
        shouldShowModal: true,
        shouldShowForm: false,
        modalUser: action.payload
      };
    case "hide-modal":
      return { ...state, shouldShowModal: false };
    case "show-create-form":
      return {
        ...state,
        shouldShowModal: false,
        shouldShowForm: true,
        formType: "create"
      };
    case "show-edit-form":
      return {
        ...state,
        shouldShowModal: false,
        shouldShowForm: true,
        formType: "edit"
      };
    case "hide-form":
      return { ...state, shouldShowForm: false };

    default:
      throw new Error("invalid action type: " + action.type);
  }
}

const CadastroUsuario = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const newUser = {
    id: "",
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    cpf: "",
    rg: "",
    admin: false
  };

  const { inputData, handleInputChange, submitForm, setData } = useForm(
    "/usuario", newUser
  );

  const {
    records,
    orderParams,
    totalNumRecords,
    paramsDispatch,
    fetchData
  } = useDataFetcher("/usuario/list");

  const { deleteRecord } = useDeleter("/usuario");

  const handleEditButton = useCallback(
    e => {
      setData(produce(state.modalUser, nextUser => nextUser));
      dispatch({ type: "show-edit-form" });
    },
    [state]
  );

  const handleSubmit = e => {
    submitForm(() => {
      dispatch({ type: "hide-form" });
      fetchData();
    });
  };

  const handleDelete = record => {
    deleteRecord(record.id, () => {
      fetchData();
    });
  };

  const handleNewUserButton = e => {
    setData(produce(newUser, nextUser => nextUser));
    dispatch({ type: "show-create-form" });
  };

  const handleShowModal = user => {
    dispatch({
      type: "show-modal",
      payload: produce(user, nextUser => nextUser)
    });
  };

  const formUsuario = state.shouldShowForm ? (
    <FormUsuario
      user={inputData}
      formType={state.formType}
      handleInputChange={handleInputChange}
      handleCancelButton={() => dispatch({ type: "hide-form" })}
      handleSubmit={handleSubmit}
    />
  ) : (
    <></>
  );

  const userDataModal = state.shouldShowModal ? (
    <UserDataModal
      user={state.modalUser}
      handleEditButton={handleEditButton}
      handlePasswordChangeButton={() => {}}
      handleCancelButton={() => dispatch({ type: "hide-modal" })}
    />
  ) : (
    <></>
  );

  return (
    <div className="container">
      <form>
        <DataTable
          records={records}
          handleShowModal={handleShowModal}
          orderParams={orderParams}
          paramsDispatch={paramsDispatch}
          handleDelete={handleDelete}
          totalNumRecords={totalNumRecords}
        />
        <div className="form-group">
          <BarraDeComandos novoUsuario={() => handleNewUserButton()} />
        </div>
      </form>
      {formUsuario}
      {userDataModal}
    </div>
  );
};

export default CadastroUsuario;

if (document.getElementById("cadastro-usuario-app")) {
  ReactDOM.render(
    <CadastroUsuario />,
    document.getElementById("cadastro-usuario-app")
  );
}
