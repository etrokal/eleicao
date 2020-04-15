const _ = require("lodash");

import reducer, {
  fetchData,
  deleteRecord,
  setFetchParamsInternal,
  getLimitSelector,
  getOffsetSelector,
  getTotalResultsSelector,
  getTotalSelector
} from "../redux/modules/eleicaoDataTable";

const state = {};
state.eleicaoDataTable = {
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

// Selectors
test("limit should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getLimitSelector(innerState)).toBe(15);
  innerState.eleicaoDataTable.params.limit = 90;
  expect(getLimitSelector(innerState)).toBe(90);
});

test("offset should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getOffsetSelector(innerState)).toBe(0);
  innerState.eleicaoDataTable.params.offset = 250;
  expect(getOffsetSelector(innerState)).toBe(250);
});

test("totalResults should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getTotalResultsSelector(innerState)).toBe(0);
  innerState.eleicaoDataTable.totalResults = 330;
  expect(getTotalResultsSelector(innerState)).toBe(330);
});

test("total should be selected correctly", () => {
  const innerState = _.cloneDeep(state);
  expect(getTotalSelector(innerState)).toBe(0);
  innerState.eleicaoDataTable.totalResults = 785;
  expect(getTotalSelector(innerState)).toBe(785);
});

// Action creators
// test("action creator saveBegin should return correct action", () => {
//   const action = saveBegin();
//   expect(action.type).toBe(SAVE_BEGIN);
// });

// REDUCER
test("reducer should return state on invalid action", () => {
  expect(reducer(state.eleicaoDataTable, {})).toBe(state.eleicaoDataTable);
});
