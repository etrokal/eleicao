import {
  SAVE_USER_BEGIN,
  SAVE_USER_SUCCESS,
  SAVE_USER_FAILURE,
  VALIDATE_EMAIL_BEGIN,
  VALIDATE_EMAIL_SUCCESS,
  VALIDATE_EMAIL_FAILURE,
  VALIDATE_CPF_BEGIN,
  VALIDATE_CPF_SUCCESS,
  VALIDATE_CPF_FAILURE,
  SHOW_USER_FORM,
  SHOW_EMPTY_USER_FORM,
  HIDE_USER_FORM,
  CHANGE_USER_DATA
} from "../actions/userFormActions";

import emptyUser from "./emptyUser";

const userFormInitialState = {
  selectedUser: emptyUser,
  typeCreate: true,
  validatingEmail: false,
  emailValid: true,
  validatingCpf: false,
  cpfValid: true,
  passwordValid: true,
  savingUser: false,
  showModal: false,
  result: null,
  error: null
};
const userForm = (state = userFormInitialState, action) => {
  switch (action.type) {
    case SAVE_USER_BEGIN:
      return { ...state, savingUser: true, error: "", result: "" };
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        savingUser: false,
        showModal: false,
        result: action.payload
      };
    case SAVE_USER_FAILURE:
      return { ...state, savingUser: false, error: action.error };

    case VALIDATE_EMAIL_BEGIN:
      return { ...state, validatingEmail: true, error: "" };
    case VALIDATE_EMAIL_SUCCESS:
      return { ...state, validatingEmail: false, emailValid: action.payload };
    case VALIDATE_EMAIL_FAILURE:
      return {
        ...state,
        validatingEmail: false,
        error: action.error,
        emailValid: false
      };

    case VALIDATE_CPF_BEGIN:
      return { ...state, validatingCpf: true, error: "" };
    case VALIDATE_CPF_SUCCESS:
      return { ...state, validatingCpf: false, cpfValid: action.payload };
    case VALIDATE_CPF_FAILURE:
      return { ...state, validatingCpf: false, error: action.error };

    case SHOW_USER_FORM:
      return { ...state, showModal: true, selectedUser: action.payload };
    case SHOW_EMPTY_USER_FORM:
      return { ...state, showModal: true, selectedUser: emptyUser };
    case HIDE_USER_FORM:
      return { ...state, showModal: false };

    case CHANGE_USER_DATA:
      let selectedUser = {
        ...state.selectedUser,
        [action.payload.name]: action.payload.value
      };
      return { ...state, selectedUser };

    default:
      return state;
  }
};

export default userForm;
