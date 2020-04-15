import {
  CHANGE_USER_PASSWORD_BEGIN,
  CHANGE_USER_PASSWORD_FAILURE,
  CHANGE_USER_PASSWORD_SUCCESS,
  HIDE_PASSWORD_FORM,
  SHOW_PASSWORD_FORM,
  CHANGE_USER_PASSWORD_DATA
} from "../actions/passwordFormActions";

import emptyUser from "./emptyUser";

const passwordFormInitialState = {
  showModal: false,
  changingPassword: false,
  selectedUser: emptyUser,
  result: null,
  error: null
};

const passwordForm = (state = passwordFormInitialState, action) => {
  switch (action.type) {
    case SHOW_PASSWORD_FORM:
      return { ...state, showModal: true, selectedUser: action.payload };
    case HIDE_PASSWORD_FORM:
      return { ...state, showModal: false };
    case CHANGE_USER_PASSWORD_BEGIN:
      return { ...state, changingPassword: true, error: "", result: "" };
    case CHANGE_USER_PASSWORD_SUCCESS:
      return {
        ...state,
        changingPassword: false,
        result: action.payload,
        showModal: false
      };
    case CHANGE_USER_PASSWORD_FAILURE:
      return { ...state, changingPassword: false, error: action.error };
    case CHANGE_USER_PASSWORD_DATA:
      let selectedUser = {
        ...state.selectedUser,
        [action.payload.name]: action.payload.value
      };
      return { ...state, selectedUser };

    default:
      return state;
  }
};

export default passwordForm;
