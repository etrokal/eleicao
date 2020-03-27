import { combineReducers } from "redux";

import dataTable from "./dataTable";
import deleteUser from "./deleteUser";
import passwordForm from "./passwordForm";
import userForm from "./userForm";
import userModal from "./userModal";

const reducer = combineReducers({
  dataTable,
  userForm,
  userModal,
  passwordForm,
  deleteUser
});

export default reducer;
