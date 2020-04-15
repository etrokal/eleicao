import { connect } from "react-redux";

import ShowDataModal from "../components/ShowDataModal";

import {
  getShouldShowModalSelector,
  getDataSelector
} from "../../../redux/modules/eleicaoShowModal";

const mapStateToProps = state => {
  return {
    showModal: getShouldShowModalSelector(state),
    data: getDataSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleCancelButton: e => {
      dispatch(hideUserData());
    },
    handleEditUserButton: user => {
      dispatch(hideUserData());
      dispatch(showUserForm(user));
    },
    handlePasswordChangeButton: user => {
      dispatch(hideUserData());
      dispatch(showPasswordForm(user));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowDataModal);
