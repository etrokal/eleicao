import React, { useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import produce from "immer";

// HOOKS
import useForm from "../../basic/hooks/useForm";
import useDataFetcher from "../../basic/hooks/useDataFetcher";
import useDeleter from "../../basic/hooks/useDeleter";

// COMPONENTS
import BarraDeComandos from "./BarraDeComandos";
import FormUsuario from "./FormUsuario";
import DataTable from "./DataTable";
import UserDataModal from "./UserDataModal";

import AlterPasswordForm from "./AlterPasswordForm";

// TODO: Falta terminar a edição, ordenação e exclusão

const initialState = {
  shouldShowModal: false,
  shouldShowForm: false,
  shouldShowAlterPasswordForm: false,
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
    case "show-password-form":
      return {
        ...state,
        shouldShowAlterPasswordForm: true,
        shouldShowModal: false,
        shouldShowForm: false
      };
    case "hide-password-form":
      return { ...state, shouldShowAlterPasswordForm: false };
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
    "/usuario",
    newUser
  );

  const passwordForm = useForm("/usuario/password", {
    password: "",
    password_confirmation: "",
    id: ""
  });

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

  const handleUserFormSubmit = callback => {
    submitForm(() => {
      fetchData();
      if (callback) callback();
      dispatch({ type: "hide-form" });
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

  const handlePasswordChangeButton = () => {
    passwordForm.setData({
      id: state.modalUser.id,
      name: state.modalUser.name,
      email: state.modalUser.email,
      cpf: state.modalUser.cpf,
      password: "",
      password_confirmation: ""
    });
    dispatch({ type: "show-password-form" });
  };

  const handlePasswordSubmit = callback => {
    passwordForm.submitForm(() => {
      if (callback) callback();
      dispatch({ type: "hide-password-form" });
    });
  };

  const renderFormUsuario = state.shouldShowForm ? (
    <FormUsuario
      user={inputData}
      formType={state.formType}
      handleInputChange={handleInputChange}
      handleCancelButton={() => dispatch({ type: "hide-form" })}
      handleSubmit={handleUserFormSubmit}
    />
  ) : (
    <></>
  );

  const renderUserDataModal = state.shouldShowModal ? (
    <UserDataModal
      user={state.modalUser}
      handleEditButton={handleEditButton}
      handlePasswordChangeButton={handlePasswordChangeButton}
      handleCancelButton={() => dispatch({ type: "hide-modal" })}
    />
  ) : (
    <></>
  );

  const renderPasswordForm = state.shouldShowAlterPasswordForm ? (
    <AlterPasswordForm
      inputData={passwordForm.inputData}
      handleInputChange={passwordForm.handleInputChange}
      handleSubmit={handlePasswordSubmit}
      handleCancelButton={() => dispatch({ type: "hide-password-form" })}
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
      {renderFormUsuario}
      {renderUserDataModal}
      {renderPasswordForm}
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
