import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  SET_FETCH_PARAMS
} from "../actions/dataTableActions";

const dataTableInitialState = {
  params: {
    orderBy: "id",
    orderAsc: true,
    offset: 0,
    limit: 15,
    filter: ""
  },
  data: [],
  totalNumRecords: 0,
  fetchingData: false,
  error: ""
};

const dataTable = (state = dataTableInitialState, action) => {
  switch (action.type) {
    case SET_FETCH_PARAMS:
      return { ...state, params: action.payload };
    case FETCH_USERS_BEGIN:
      return { ...state, fetchingData: true, error: "" };
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        data: action.payload.data,
        totalNumRecords: action.payload.totalNumRecords
      };
    case FETCH_USERS_FAILURE:
      return { ...state, data: [], totalNumRecords: 0, error: action.error };
    default:
      return state;
  }
};

export default dataTable;
