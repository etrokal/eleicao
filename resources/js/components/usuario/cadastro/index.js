import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./containers/AppContainer";
import reducer from "./redux/reducers";

import { fetchUsers } from "./redux/actions/dataTableActions";

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(fetchUsers());

if (document.getElementById("cadastro-usuario-app")) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("cadastro-usuario-app")
  );
}
