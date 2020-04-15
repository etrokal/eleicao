import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import userDataTable from "./reducers/userDataTable";
import deleteUser from "./reducers/deleteUser";
import passwordForm from "./reducers/passwordForm";
import userForm from "./reducers/userForm";
import userModal from "./reducers/userModal";

import eleicaoDataTable from "./modules/eleicaoDataTable";
import eleicaoForm from "./modules/eleicaoForm";
import eleicaoShowModal from "./modules/eleicaoShowModal";

import { composeWithDevTools } from "redux-devtools-extension";

export const reducer = combineReducers({
  userDataTable,
  userForm,
  userModal,
  passwordForm,
  deleteUser,
  eleicaoDataTable,
  eleicaoForm,
  eleicaoShowModal
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
