import Axios from "axios";

import AxiosErrorHandler from "../../../../../util/AxiosErrorHandler";

const debounceRate = 1000;

export const SHOW_PASSWORD_FORM = "SHOW_PASSWORD_FORM";
export const HIDE_PASSWORD_FORM = "HIDE_PASSWORD_FORM";

export const CHANGE_USER_PASSWORD_BEGIN = "CHANGE_USER_PASSWORD_BEGIN";
export const CHANGE_USER_PASSWORD_SUCCESS = "CHANGE_USER_PASSWORD_SUCCESS";
export const CHANGE_USER_PASSWORD_FAILURE = "CHANGE_USER_PASSWORD_FAILURE";

export const CHANGE_USER_PASSWORD_DATA = "CHANGE_USER_PASSWORD_DATA";

export const showPasswordForm = user => ({
  type: SHOW_PASSWORD_FORM,
  payload: user
});
export const hidePasswordForm = () => ({ type: HIDE_PASSWORD_FORM });

const changePasswordUrl = "/usuario/password";

const changeUserPasswordBegin = () => ({ type: CHANGE_USER_PASSWORD_BEGIN });
const changeUserPasswordSuccess = data => ({
  type: CHANGE_USER_PASSWORD_SUCCESS,
  payload: data
});
const changeUserPasswordFailure = error => ({
  type: CHANGE_USER_PASSWORD_FAILURE,
  error
});

export const changeUserPassword = () => (dispatch, getState) => {
  dispatch(changeUserPasswordBegin());

  const password = getState().passwordForm.selectedUser.password;
  const password_confirmation = getState().passwordForm.selectedUser
    .password_confirmation;
  const id = getState().passwordForm.selectedUser.id;
  Axios.put(changePasswordUrl, {
    password,
    password_confirmation,
    id
  })
    .then(result => {
      dispatch(changeUserPasswordSuccess(result.data));
    })
    .catch(error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(changeUserPasswordFailure(handledError));
    });
};

export const changeUserPasswordData = data => ({
  type: CHANGE_USER_PASSWORD_DATA,
  payload: data
});
