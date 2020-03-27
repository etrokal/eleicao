import { connect } from "react-redux";

import { showUserData, hideUserData } from "../redux/actions/userModalActions";
import { showUserForm } from "../redux/actions/userFormActions";
import { showPasswordForm } from "../redux/actions/passwordFormActions";
import UserDataModal from "../components/UserDataModal";

const mapStateToProps = state => {
  return {
    showModal: state.userModal.showModal,
    selectedUser: state.userModal.selectedUser
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

export default connect(mapStateToProps, mapDispatchToProps)(UserDataModal);
