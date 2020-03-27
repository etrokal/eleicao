import Axios from "axios";
import AxiosErrorHandler from "../../../../../util/AxiosErrorHandler";

export const DELETE_USER_BEGIN = "DELETE_USER_BEGIN";
export const DELETE_USER_SUCCESS = "DELETE_USER_SUCCESS";
export const DELETE_USER_FAILURE = "DELETE_USER_FAILURE";

const deleteUserBegin = user => ({ type: DELETE_USER_BEGIN, payload: user });
const deleteUserSuccess = () => ({ type: DELETE_USER_SUCCESS });
const deleteUserFailure = error => ({ type: DELETE_USER_FAILURE, error });

const deleteUserUrl = "";

export const deleteUser = user => (dispatch, getState) => {
  dispatch(deleteUserBegin(user));

  Axios.delete(`${deleteUserUrl}/${getState().deleteUser.selectedUser.id}`)
    .then(result => {
      dispatch(deleteUserSuccess(result.data));
    })
    .catch(error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(deleteUserFailure(handledError));
    });
};
