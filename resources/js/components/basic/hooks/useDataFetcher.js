import React, { useEffect, useCallback, useReducer } from "react";
import produce from "immer";
import Axios from "axios";

const initialState = {
  records: [],
  numRecords: 0,
  params: {
    orderBy: "id",
    orderAsc: true,
    offset: 0,
    limit: 15,
    filter: ""
  }
};

const reducer = (state, action) => {
  //   const params = state.params;

  switch (action.type) {
    case "set-records":
      return produce(state, nextState => {
        nextState.records = action.payload.records;
        nextState.numRecords = action.payload.numRecords;
      });

    case "set-param-orderby":
      return produce(state, nextState => {
        nextState.params.orderBy = action.payload;
      });
    case "set-param-orderasc":
      return produce(state, nextState => {
        nextState.params.orderAsc = action.payload;
      });
    case "set-param-offset":
      return produce(state, nextState => {
        nextState.params.offset = action.payload;
      });
    case "set-param-limit":
      return produce(state, nextState => {
        nextState.params.limit = action.payload;
        nextState.params.offset =
          nextState.params.offset -
          (nextState.params.offset % nextState.params.limit);
      });
    case "set-param-filter":
      return produce(state, nextState => {
        nextState.params.filter = action.payload;
      });
    default:
      throw new Error("invalid action type: " + action.type);
  }
};

const useDataFetcher = url => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => fetchData(state.params), [state.params]);

  const fetchData = useCallback(
    _.debounce((params, callback) => {
      Axios.get(url, {
        params: {
          offset: params.offset,
          limit: params.limit,
          orderBy: params.orderBy,
          orderAsc: params.orderAsc,
          filter: params.filter
        }
      })
        .then(result => {
          dispatch({
            type: "set-records",
            payload: {
              records: result.data.records,
              numRecords: result.data.totalNumRecords
            }
          });

          if (callback) callback();
        })
        // TODO usar função para lidar com erros do axios
        .catch(error => {
          console.error(error);
        });
    }, 500),
    []
  );

  return {
    records: state.records,
    orderParams: state.params,
    totalNumRecords: state.numRecords,
    paramsDispatch: dispatch,
    fetchData: callback => fetchData(state.params, callback)
  };
};

export default useDataFetcher;
