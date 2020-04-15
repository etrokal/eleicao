import React from "react";

// COMPONENTS

import FormContainer from "../containers/FormContainer";
import DataTableContainer from "../containers/DataTableContainer";
import UserDataModalContainer from "../containers/ShowModalContainer";
import AlterPasswordFormContainer from "../containers/AlterPasswordFormContainer";

const App = ({ showUserForm, showUserModal, showPasswordForm }) => {
  return (
    <div className="container">
      <form>
        <DataTableContainer />
      </form>
      {showUserForm ? <FormContainer /> : <></>}
      {showUserModal ? <UserDataModalContainer /> : <></>}
      {showPasswordForm ? <AlterPasswordFormContainer /> : <></>}
    </div>
  );
};

export default App;
