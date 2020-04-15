import { connect } from "react-redux";
import Pagination from "../../common/components/Pagination";

import {
  setFetchParams,
  getLimitSelector,
  getOffsetSelector,
  getTotalResultsSelector
} from "../../../redux/modules/eleicaoDataTable";

const mapStateToProps = state => ({
  limit: getLimitSelector(state),
  offset: getOffsetSelector(state),
  totalNumRecords: getTotalResultsSelector(state)
});

const mapDispatchToProps = dispatch => ({
  handleOffsetChange: offset => {
    dispatch(setFetchParams({ offset }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
