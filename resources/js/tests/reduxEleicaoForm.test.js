const _ = require("lodash");

import reducer, {
  saveBegin,
  saveSuccess,
  saveFailure,
  SAVE_BEGIN,
  SAVE_SUCCESS,
  SAVE_FAILURE,
  getIsSavingSelector,
  getDataSelector,
  getDatesInPastSelector,
  getErrorSelector,
  getResultSelector,
  getShouldShowFormSelector
} from "../redux/modules/eleicaoForm";

const state = {};
state.eleicaoForm = {
  data: {
    id: "",
    nome: "",
    data_inicio: "",
    data_fim: ""
  },
  isSaving: false,
  shouldShowForm: false,
  result: null,
  error: null
};

// Selectors
test("isSaving should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getIsSavingSelector(innerState)).toBe(false);
  innerState.eleicaoForm.isSaving = true;
  expect(getIsSavingSelector(innerState)).toBe(true);
});

test("data should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getDataSelector(innerState)).toBe(innerState.eleicaoForm.data);
});

test("datesInPast should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  innerState.eleicaoForm.data.data_inicio = "1970-01-01T00:00";
  innerState.eleicaoForm.data.data_fim = "1970-01-02T00:00";
  expect(getDatesInPastSelector(innerState)).toBe(true);

  innerState.eleicaoForm.data.data_inicio = "2200-01-01T00:00";
  innerState.eleicaoForm.data.data_fim = "2200-01-02T00:00";
  expect(getDatesInPastSelector(innerState)).toBe(false);
});

test("error should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  const errorString = "ERROR_STRING";
  innerState.eleicaoForm.error = errorString;
  expect(getErrorSelector(innerState)).toBe(errorString);
});

test("result should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  const resultString = "RESULT_STRING";
  innerState.eleicaoForm.result = resultString;
  expect(getResultSelector(innerState)).toBe(resultString);
});

test("shouldShowForm should be selected correctly", () => {
  const innerState = _.cloneDeep(state);

  expect(getShouldShowFormSelector(innerState)).toBe(false);

  innerState.eleicaoForm.shouldShowForm = true;
  expect(getShouldShowFormSelector(innerState)).toBe(true);
});

// Action creators
test("action creator saveBegin should return correct action", () => {
  const action = saveBegin();
  expect(action.type).toBe(SAVE_BEGIN);
});

test("action creator saveSuccess should return correct action", () => {
  const mockData = { object: "fakeData" };
  const action = saveSuccess(mockData);
  expect(action.type).toBe(SAVE_SUCCESS);
  expect(action.payload).toBe(mockData);
});

test("action creator saveFailure should return correct action", () => {
  const mockData = { object: "fakeData" };
  const action = saveFailure(mockData);
  expect(action.type).toBe(SAVE_FAILURE);
  expect(action.error).toBe(mockData);
});

test("state should be saving after SAVE_BEGIN", () => {
  expect(reducer(state.eleicaoForm, {})).toBe(state.eleicaoForm);
});

// REDUCER
test("reducer should return state on invalid action", () => {
  expect(reducer(state.eleicaoForm, {})).toBe(state.eleicaoForm);
});

test("reducer should update correctly on SAVE_BEGIN", () => {
  const innerState = _.cloneDeep(state);
  const newState = {
    eleicaoForm: reducer(innerState.eleicaoForm, saveBegin())
  };

  expect(getIsSavingSelector(newState)).toBe(true);
  expect(getErrorSelector(newState)).toBe("");
});

test("reducer should update correctly on SAVE_SUCCESS", () => {
  const innerState = _.cloneDeep(state);
  reducer(innerState.eleicaoForm, saveBegin());
  const newData = {
    id: "OK",
    nome: "OK",
    data_inicio: "OK",
    data_fim: "OK"
  };
  const newState = {
    eleicaoForm: reducer(innerState.eleicaoForm, saveSuccess(newData))
  };

  expect(getIsSavingSelector(newState)).toBe(false);
  expect(getResultSelector(newState)).toBe(newData);
  expect(getShouldShowFormSelector(newState)).toBe(false);
});

test("reducer should update correctly on SAVE_FAILURE", () => {
  const innerState = _.cloneDeep(state);
  reducer(innerState.eleicaoForm, saveBegin());
  const error = { msg: "ERROR MESSAGE" };
  const newState = {
    eleicaoForm: reducer(innerState.eleicaoForm, saveFailure(error))
  };

  expect(getIsSavingSelector(newState)).toBe(false);
  expect(getErrorSelector(newState)).toBe(error);
});
