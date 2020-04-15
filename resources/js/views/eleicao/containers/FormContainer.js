import { connect } from "react-redux";

import getDataFromEvent from "../../../util/getDataFromEvent";

import {
  changeData,
  hideForm,
  save,
  getShouldShowFormSelector,
  getIsSavingSelector,
  getDataSelector,
  getResultSelector,
  getErrorSelector,
  getDatesInPastSelector
} from "../../../redux/modules/eleicaoForm";

import Form from "../components/Form";

const mapStateToProps = state => ({
  shouldShowForm: getShouldShowFormSelector(state),
  isSaving: getIsSavingSelector(state),
  data: getDataSelector(state),
  result: getResultSelector(state),
  error: getErrorSelector(state),
  datesInPast: getDatesInPastSelector(state)
});

const mapDispatchToProps = dispatch => ({
  handleInputChange: e => {
    if (e.persist) e.persist();
    dispatch(changeData(getDataFromEvent(e)));
  },
  handleCancelButton: () => {
    dispatch(hideForm());
  },
  handleSubmit: e => {
    e.preventDefault();
    dispatch(save());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
