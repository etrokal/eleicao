import Axios from "axios";

import AxiosErrorHandler from "../../../../../util/AxiosErrorHandler";

const debounceRate = 1000;

export const FETCH_USERS_BEGIN = "FETCH_USERS_BEGIN";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

export const SET_FETCH_PARAMS = "SET_FETCH_PARAMS";

const fetchDataUrl = "/usuario/list";

export const fetchUsersBegin = () => {
  return {
    type: FETCH_USERS_BEGIN
  };
};

export const fetchUsersSuccess = payload => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload
  };
};

export const fetchUsersFailure = error => {
  return {
    type: FETCH_USERS_FAILURE,
    error
  };
};

const innerFetchUsers = _.debounce((dispatch, getState) => {
  dispatch(fetchUsersBegin());
  Axios.get(fetchDataUrl, { params: getState().dataTable.params }).then(
    result => {
      dispatch(
        fetchUsersSuccess({
          data: result.data.records,
          totalNumRecords: result.data.totalNumRecords
        })
      );
    },
    err => {
      const handledError = AxiosErrorHandler(err);
      dispatch(fetchUsersFailure(handledError));
    }
  );
}, debounceRate);

export const fetchUsers = () => innerFetchUsers;

const setFetchParamsInternal = params => {
  return {
    type: SET_FETCH_PARAMS,
    payload: params
  };
};

export const setFetchParams = params => (dispatch, getState) => {
  const newParams = { ...getState().dataTable.params, ...params };
  newParams.offset = newParams.offset - (newParams.offset % newParams.limit);

  dispatch(setFetchParamsInternal(newParams));
  dispatch(fetchUsers());
};
