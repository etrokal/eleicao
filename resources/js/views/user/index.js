import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./containers/AppContainer";
import store from "../../redux/store";

import { fetchUsers } from "../../redux/actions/userDataTableActions";

store.dispatch(fetchUsers());

if (document.getElementById("cadastro-usuario-app")) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("cadastro-usuario-app")
  );
}
