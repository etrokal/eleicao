import React from "react";

// COMPONENTS

import FormUsuarioContainer from "../containers/FormUsuarioContainer";
import DataTableContainer from "../containers/DataTableContainer";
import UserDataModalContainer from "../containers/UserDataModalContainer";
import AlterPasswordFormContainer from "../containers/AlterPasswordFormContainer";

const App = ({ showUserForm, showUserModal, showPasswordForm }) => {
  return (
    <div className="container">
      <form>
        <DataTableContainer />
      </form>
      {showUserForm ? <FormUsuarioContainer /> : <></>}
      {showUserModal ? <UserDataModalContainer /> : <></>}
      {showPasswordForm ? <AlterPasswordFormContainer /> : <></>}
    </div>
  );
};

export default App;
