import { HIDE_USER_DATA, SHOW_USER_DATA } from "../actions/userModalActions";

import emptyUser from "./emptyUser";

const userModalInitialState = {
  showModal: false,
  selectedUser: emptyUser
};
const userModal = (state = userModalInitialState, action) => {
  switch (action.type) {
    case SHOW_USER_DATA:
      return { ...state, showModal: true, selectedUser: action.payload };
    case HIDE_USER_DATA:
      return { ...state, showModal: false };
    default:
      return state;
  }
};

export default userModal;
