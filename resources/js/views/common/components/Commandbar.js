import React from "react";

const Commandbar = ({ handleNew, newRecordLabel }) => {
  return (
    <div>
      <button className="btn btn-primary" type="button" onClick={handleNew}>
        {newRecordLabel}
      </button>
    </div>
  );
};

export default Commandbar;
