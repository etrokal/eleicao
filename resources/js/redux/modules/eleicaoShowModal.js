// Constants

// Actions
const SHOW_MODAL = "eleicao/eleicaoShowModal/SHOW_MODAL";
const HIDE_MODAL = "eleicao/eleicaoShowModal/HIDE_MODAL";

// Reducer
const initialState = {
  data: {},
  shouldShowModal: false
};

export default function reducer(state = initialState, action) {
  let data;
  switch (action.type) {
    case SHOW_MODAL:
      data = {
        ...state.data,
        ...action.payload
      };
      return { ...state, shouldShowModal: true, data };
    case HIDE_MODAL:
      return { ...state, shouldShowModal: false };
    default:
      return state;
  }
}

// Action Creators
export const showModal = payload => ({ type: SHOW_MODAL, payload });

export const hideModal = () => ({ type: HIDE_MODAL });

// Selectors
export const getShouldShowModalSelector = state =>
  state.eleicaoShowModal.shouldShowModal;
export const getDataSelector = state => state.eleicaoShowModal.data;
