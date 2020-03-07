import React from "react";

export default class TextField extends React.Component {
  constructor(props) {
    super(props);

    this.handleValueChange = this.handleValueChange.bind(this);
  }

  handleValueChange(e) {
    const textInput = e.target;
    this.props.handleValueChange(textInput.value);
  }

  render() {
    const placeholder = this.props.placeholder || "";

    return (
      <div className="form-inline">
        <label className="sr-only" htmlFor="text-field">
          {placeholder}
        </label>
        <input
          id="text-field"
          type="text"
          className="form-control"
          value={this.props.value}
          onChange={this.handleValueChange}
          placeholder={placeholder}
        />
      </div>
    );
  }
}
