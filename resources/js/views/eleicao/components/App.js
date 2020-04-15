import React from "react";

// COMPONENTS

import FormContainer from "../containers/FormContainer";
import DataTableContainer from "../containers/DataTableContainer";
import ShowModalContainer from "../containers/ShowModalContainer";

const App = ({ showEleicaoForm, showEleicaoModal }) => {
  return (
    <div className="container">
      <form>
        <DataTableContainer />
      </form>
      {showEleicaoForm ? <FormContainer /> : <></>}
      {showEleicaoModal ? <ShowModalContainer /> : <></>}
    </div>
  );
};

export default App;
