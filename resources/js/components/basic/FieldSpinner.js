import React from "react";

export default class FieldSpinner extends React.Component {
  render() {
    return (
      <span
        className="spinner-border spinner-border-sm mb-1 ml-1"
        role="status"
        aria-hidden="true"
      ></span>
    );
  }
}
