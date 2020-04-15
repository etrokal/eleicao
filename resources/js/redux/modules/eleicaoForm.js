import Axios from "axios";
import moment, { now } from "moment";
import AxiosErrorHandler from "../../util/AxiosErrorHandler";
import { fetchData } from "./eleicaoDataTable";
const _ = require("lodash");

// Constants
const baseUrl = "/eleicao";
const emptyEleicao = {
  id: "",
  nome: "",
  data_inicio: "",
  data_fim: ""
};

// Actions
export const SAVE_BEGIN = "eleicao/eleicaoForm/SAVE_BEGIN";
export const SAVE_SUCCESS = "eleicao/eleicaoForm/SAVE_SUCCESS";
export const SAVE_FAILURE = "eleicao/eleicaoForm/SAVE_FAILURE";
export const SHOW_FORM = "eleicao/eleicaoForm/SHOW_FORM";
export const SHOW_EMPTY_FORM = "eleicao/eleicaoForm/SHOW_EMPTY_FORM";
export const HIDE_FORM = "eleicao/eleicaoForm/HIDE_FORM";
export const CHANGE_DATA = "eleicao/eleicaoForm/CHANGE_DATA";

// Initial State
const initialState = {
  data: emptyEleicao,
  isSaving: false,
  shouldShowForm: false,
  result: null,
  error: null
};

// Reducer
export default function reducer(state = initialState, action) {
  let data;
  switch (action.type) {
    case SAVE_BEGIN:
      return { ...state, isSaving: true, error: "" };
    case SAVE_SUCCESS:
      return {
        ...state,
        isSaving: false,
        shouldShowForm: false,
        result: action.payload
      };
    case SAVE_FAILURE:
      return { ...state, isSaving: false, error: action.error };

    case SHOW_FORM:
      return { ...state, shouldShowForm: true, data: action.payload };
    case SHOW_EMPTY_FORM:
      data = {
        ...state.data,
        ...emptyEleicao
      };
      return { ...state, shouldShowForm: true, data };
    case HIDE_FORM:
      return { ...state, shouldShowForm: false };

    case CHANGE_DATA:
      data = {
        ...state.data,
        [action.payload.name]: action.payload.value
      };
      return { ...state, data };

    default:
      return state;
  }
}

// Action creators
export const saveBegin = () => ({
  type: SAVE_BEGIN
});

export const saveSuccess = payload => ({
  type: SAVE_SUCCESS,
  payload
});

export const saveFailure = error => ({
  type: SAVE_FAILURE,
  error
});

export const showForm = payload => ({ type: SHOW_FORM, payload });
export const showEmptyForm = () => ({ type: SHOW_EMPTY_FORM });
export const hideForm = () => ({ type: HIDE_FORM });
export const changeData = payload => ({ type: CHANGE_DATA, payload });

// Async action Creators
export const save = () => (dispatch, getState) => {
  dispatch(saveBegin());
  const data = getState().eleicaoForm.data;
  const isUpdate = !!data.id;
  let promise;
  if (isUpdate) {
    promise = Axios.put(baseUrl + "/" + data.id, data);
  } else {
    promise = Axios.post(baseUrl, data);
  }

  promise.then(
    result => {
      dispatch(saveSuccess(result.data));
      dispatch(fetchData());
    },
    error => {
      const handledError = AxiosErrorHandler(error);
      dispatch(saveFailure(handledError));
    }
  );
};

// Selectors
export const getShouldShowFormSelector = state =>
  state.eleicaoForm.shouldShowForm;

export const getIsSavingSelector = state => state.eleicaoForm.isSaving;

export const getDataSelector = state => state.eleicaoForm.data;

export const getResultSelector = state => state.eleicaoForm.result;

export const getErrorSelector = state => state.eleicaoForm.error;

export const getDatesInPastSelector = state => {
  const dataInicio = moment(state.eleicaoForm.data.data_inicio);
  const dataFim = moment(state.eleicaoForm.data.data_fim);

  return (
    dataInicio.isValid() &&
    dataFim.isValid() &&
    dataInicio.isBefore() &&
    dataFim.isBefore()
  );
};
