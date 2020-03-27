import { connect } from "react-redux";
import Pagination from "../components/Pagination";

import { setFetchParams } from "../redux/actions/dataTableActions";

const mapStateToProps = state => ({
  limit: state.dataTable.params.limit,
  offset: state.dataTable.params.offset,
  totalNumRecords: state.dataTable.totalNumRecords
});

const mapDispatchToProps = dispatch => ({
  handleOffsetChange: offset => {
    dispatch(setFetchParams({ offset }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
