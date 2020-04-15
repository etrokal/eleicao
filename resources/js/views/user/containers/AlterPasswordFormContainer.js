import React from "react";
import { connect } from "react-redux";

import AlterPasswordForm from "../components/AlterPasswordForm";
import getDataFromEvent from "../../../util/getDataFromEvent";

import {
  changeUserPasswordData,
  changeUserPassword,
  hidePasswordForm
} from "../../../redux/actions/passwordFormActions";

const mapStateToProps = state => ({
  selectedUser: state.passwordForm.selectedUser,
  showModal: state.passwordForm.showModal,
  changingPassword: state.passwordForm.changingPassword,
  result: state.passwordForm.result
});

const mapDispatchToProps = dispatch => ({
  handleInputData: e => {},
  handleSubmit: e => {
    dispatch(changeUserPassword());
  },
  handleInputChange: e => {
    dispatch(changeUserPasswordData(getDataFromEvent(e)));
  },
  handleCancelButton: e => {
    dispatch(hidePasswordForm());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(AlterPasswordForm);
