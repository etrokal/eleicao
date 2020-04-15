import { connect } from "react-redux";
import App from "../components/App";

import { getShouldShowFormSelector } from "../../../redux/modules/eleicaoForm";
import { getShouldShowModalSelector } from "../../../redux/modules/eleicaoShowModal";

const mapStateToProps = state => ({
  showEleicaoForm: getShouldShowFormSelector(state),
  showEleicaoModal: getShouldShowModalSelector(state)
});

export default connect(mapStateToProps)(App);
