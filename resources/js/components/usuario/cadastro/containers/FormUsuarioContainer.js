import React, { useReducer, useEffect, useCallback } from "react";
import Axios from "axios";

import { connect } from "react-redux";
import FormUsuario from "../components/FormUsuario";

import getDataFromEvent from "../../../../util/getDataFromEvent";

import {
  changeUserData,
  validateEmail,
  validateCpf,
  hideUserForm,
  saveUser
} from "../redux/actions/userFormActions";

const mapStateToProps = state => state.userForm;

const mapDispatchToProps = dispatch => ({
  handleEmailChange: e => {
    e.persist();
    const data = getDataFromEvent(e);
    dispatch(changeUserData(data));
    dispatch(validateEmail(data.value));
  },
  handleCpfChange: e => {
    const data = getDataFromEvent(e);
    dispatch(changeUserData(data));
    dispatch(validateCpf(data.value));
  },
  handleInputChange: e => {
    e.persist();
    dispatch(changeUserData(getDataFromEvent(e)));
  },
  handleCancelButton: e => {
    dispatch(hideUserForm());
  },
  handleSubmit: e => {
    e.preventDefault();
    dispatch(saveUser());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormUsuario);
