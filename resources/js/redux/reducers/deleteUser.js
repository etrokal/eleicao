import {
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE
} from "../actions/deleteUserActions";

import emptyUser from "./emptyUser";

const deleteUserInitialState = {
  selectedUser: emptyUser,
  deletingUser: false,
  deleteUserResult: null,
  error: null
};
const deleteUser = (state = deleteUserInitialState, action) => {
  switch (action.type) {
    case DELETE_USER_BEGIN:
      return {
        ...state,
        selectedUser: action.payload,
        deletingUser: true,
        error: null
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        deletingUser: false,
        deleteUserResult: action.payload
      };
    case DELETE_USER_FAILURE:
      return {
        ...state,
        deletingUser: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default deleteUser;
