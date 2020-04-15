import { connect } from "react-redux";
import Pagination from "../../common/components/Pagination";

import { setFetchParams } from "../../../redux/actions/userDataTableActions";

const mapStateToProps = state => ({
  limit: state.userDataTable.params.limit,
  offset: state.userDataTable.params.offset,
  totalNumRecords: state.userDataTable.totalNumRecords
});

const mapDispatchToProps = dispatch => ({
  handleOffsetChange: offset => {
    dispatch(setFetchParams({ offset }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
