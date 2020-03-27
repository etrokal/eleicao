import Axios from "axios";
import AxiosErrorHandler from "../../../../../util/AxiosErrorHandler";
import { fetchUsers } from "./dataTableActions";

const debounceRate = 1000;

export const SAVE_USER_BEGIN = "SAVE_USER_BEGIN";
export const SAVE_USER_SUCCESS = "SAVE_USER_SUCCESS";
export const SAVE_USER_FAILURE = "SAVE_USER_FAILURE";

export const VALIDATE_EMAIL_BEGIN = "VALIDATE_EMAIL_BEGIN";
export const VALIDATE_EMAIL_SUCCESS = "VALIDATE_EMAIL_SUCCESS";
export const VALIDATE_EMAIL_FAILURE = "VALIDATE_EMAIL_FAILURE";

export const VALIDATE_CPF_BEGIN = "VALIDATE_CPF_BEGIN";
export const VALIDATE_CPF_SUCCESS = "VALIDATE_CPF_SUCCESS";
export const VALIDATE_CPF_FAILURE = "VALIDATE_CPF_FAILURE";

export const SHOW_USER_FORM = "SHOW_USER_FORM";
export const SHOW_EMPTY_USER_FORM = "SHOW_EMPTY_USER_FORM";
export const HIDE_USER_FORM = "HIDE_USER_FORM";

export const CHANGE_USER_DATA = "CHANGE_USER_DATA";

const baseUrl = "/usuario";

export const saveUserBegin = () => {
  return {
    type: SAVE_USER_BEGIN
  };
};

export const saveUserSuccess = payload => {
  return {
    type: SAVE_USER_SUCCESS,
    payload
  };
};

export const saveUserFailure = error => {
  return {
    type: SAVE_USER_FAILURE,
    error
  };
};

export const saveUser = () => (dispatch, getState) => {
  dispatch(saveUserBegin());
  const user = getState().userForm.selectedUser;
  const isUpdate = !!user.id;
  let promise;
  if (isUpdate) {
    promise = Axios.put(baseUrl + "/" + user.id, user);
  } else {
    promise = Axios.post(baseUrl, user);
  }

  promise.then(
    result => {
      dispatch(saveUserSuccess(result.data));
      dispatch(fetchUsers());
    },
    error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(saveUserFailure(handledError));
    }
  );
};

const validateEmailUrl = "/verificacoes/usuario/email";

const validateEmailBegin = () => {
  return { type: VALIDATE_EMAIL_BEGIN };
};

const validateEmailSuccess = isValid => {
  return {
    type: VALIDATE_EMAIL_SUCCESS,
    payload: isValid
  };
};

const validateEmailFailure = error => {
  return {
    type: VALIDATE_EMAIL_SUCCESS,
    error
  };
};

const innerValidateEmail = _.debounce((dispatch, getState) => {
  dispatch(validateEmailBegin());

  const email = getState().userForm.selectedUser.email;
  const id = getState().userForm.selectedUser.id;

  Axios.get(validateEmailUrl, { params: { email, id } })
    .then(result => {
      console.log(result.data);
      dispatch(validateEmailSuccess(!!result.data.unico));
    })
    .catch(error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(validateEmailFailure(handledError));
    });
}, debounceRate);

export const validateEmail = () => innerValidateEmail;

const validateCpfUrl = "/verificacoes/usuario/cpf";

const validateCpfBegin = () => ({
  type: VALIDATE_CPF_BEGIN
});

const validateCpfSuccess = isValid => ({
  type: VALIDATE_CPF_SUCCESS,
  payload: isValid
});

const validateCpfFailure = error => ({
  type: VALIDATE_CPF_FAILURE,
  error
});

const innerValidateCpf = _.debounce((dispatch, getState) => {
  dispatch(validateCpfBegin());

  const cpf = getState().userForm.selectedUser.cpf;
  const id = getState().userForm.selectedUser.id;

  Axios.get(validateCpfUrl, { params: { cpf, id } })
    .then(result => {
      dispatch(validateCpfSuccess(!!result.data.unico));
    })
    .catch(error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(validateCpfFailure(handledError));
    });
}, debounceRate);

export const validateCpf = () => innerValidateCpf;

export const showUserForm = user => ({ type: SHOW_USER_FORM, payload: user });
export const showEmptyUserForm = () => ({ type: SHOW_EMPTY_USER_FORM });
export const hideUserForm = () => ({ type: HIDE_USER_FORM });

export const changeUserData = obj => {
  return { type: CHANGE_USER_DATA, payload: obj };
};
