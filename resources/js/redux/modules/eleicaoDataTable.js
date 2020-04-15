import Axios from "axios";
import AxiosErrorHandler from "../../util/AxiosErrorHandler";
const _ = require("lodash");

// Constants
const debounceRate = 1000;
const fetchDataUrl = "/eleicao/list";

// Actions
export const SET_PARAMS = "eleicao/eleicaoDataTable/SET_PARAMS";
export const FETCH_BEGIN = "eleicao/eleicaoDataTable/FETCH_BEGIN";
export const FETCH_SUCCESS = "eleicao/eleicaoDataTable/FETCH_SUCCESS";
export const FETCH_FAILURE = "eleicao/eleicaoDataTable/FETCH_FAILURE";
export const DELETE_BEGIN = "eleicao/eleicaoDataTable/DELETE_BEGIN";
export const DELETE_SUCCESS = "eleicao/eleicaoDataTable/DELETE_SUCCESS";
export const DELETE_FAILURE = "eleicao/eleicaoDataTable/DELETE_FAILURE";

// Reducer
const initialState = {
  params: {
    orderBy: "id",
    orderAsc: true,
    offset: 0,
    limit: 15,
    filter: ""
  },
  data: [],
  total: 0,
  totalResults: 0,
  isFetching: false,
  lastFetch: "",
  error: "",
  isDeleting: false,
  deleteError: null,
  deleteResult: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_PARAMS:
      return { ...state, params: action.payload };
    case FETCH_BEGIN:
      return { ...state, isFetching: true, error: "" };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload.data,
        total: action.payload.total,
        lastFetch: action.payload.date,
        totalResults: action.payload.totalResults
      };
    case FETCH_FAILURE:
      return {
        ...state,
        data: [],
        totalNumRecords: 0,
        error: action.error,
        isFetching: false
      };
    case DELETE_BEGIN:
      return {
        ...state,
        isDeleting: true,
        deleteError: null
      };
    case DELETE_SUCCESS:
      return { ...state, deleteResult: action.payload, isDeleting: false };
    case DELETE_FAILURE:
      return {
        ...state,
        isDeleting: false,
        deleteError: action.error
      };
    default:
      return state;
  }
}

// Action Creators
export const fetchBegin = () => ({
  type: FETCH_BEGIN
});

export const fetchSuccess = payload => ({
  type: FETCH_SUCCESS,
  payload
});

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  error
});

export const setFetchParamsInternal = params => ({
  type: SET_PARAMS,
  payload: params
});

export const fetchData = () => innerFetch;

export const deleteBegin = () => ({
  type: DELETE_BEGIN
});

export const deleteSuccess = payload => ({
  type: DELETE_SUCCESS,
  payload
});

export const deleteFailure = error => ({
  type: DELETE_FAILURE,
  error
});

// Async Actions
const innerFetch = _.debounce((dispatch, getState) => {
  dispatch(fetchBegin());
  Axios.get(fetchDataUrl, { params: getState().eleicaoDataTable.params }).then(
    result => {
      dispatch(
        fetchSuccess({
          data: result.data.records || [],
          total: result.data.totalNumRecords || 0,
          totalResults: result.data.totalResults || 0,
          date: new Date()
        })
      );
    },
    err => {
      const handledError = AxiosErrorHandler(err);
      dispatch(fetchFailure(handledError));
    }
  );
}, debounceRate);

export const setFetchParams = params => (dispatch, getState) => {
  const newParams = { ...getParamsSelector(getState()), ...params };
  newParams.offset = newParams.offset - (newParams.offset % newParams.limit);

  dispatch(setFetchParamsInternal(newParams));
  dispatch(fetchData());
};

export const deleteRecord = record => (dispatch, getState) => {
  dispatch(deleteBegin());

  Axios.delete(`${fetchDataUrl}/${record.id}`)
    .then(result => {
      dispatch(deleteSuccess(result.data));
    })
    .catch(error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(deleteFailure(handledError));
    });
};

// Selectors
export const getLimitSelector = state => state.eleicaoDataTable.params.limit;

export const getOffsetSelector = state => state.eleicaoDataTable.params.offset;

export const getTotalSelector = state => state.eleicaoDataTable.total;

export const getDataSelector = state => state.eleicaoDataTable.data;

export const getParamsSelector = state => state.eleicaoDataTable.params;

export const getIsFetchingSelector = state => state.eleicaoDataTable.isFetching;

export const getErrorSelector = state => state.eleicaoDataTable.error;

export const getTotalResultsSelector = state =>
  state.eleicaoDataTable.totalResults;
