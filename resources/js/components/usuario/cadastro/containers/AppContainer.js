import React, { useCallback, useReducer } from "react";

// COMPONENTS

import App from "../components/App";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  showUserForm: state.userForm.showModal,
  showUserModal: state.userModal.showModal,
  showPasswordForm: state.passwordForm.showModal
});

export default connect(mapStateToProps)(App);
