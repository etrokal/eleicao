import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import App from "./containers/AppContainer";
import store from "../../redux/store";

import { fetchData } from "../../redux/modules/eleicaoDataTable";

store.dispatch(fetchData());

if (document.getElementById("cadastro-eleicao-app")) {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("cadastro-eleicao-app")
  );
}
