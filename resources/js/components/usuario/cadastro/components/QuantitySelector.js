import React from "react";

export default class QuantitySelector extends React.Component {
  constructor(props) {
    super(props);

    this.quantityOptions = [10, 15, 30, 50, 100];

    this.renderOptions = this.renderOptions.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
  }

  handleQuantityChange(e) {
    const select = e.target;
    const value = select.value;

    this.props.handleQuantityChange(value);
  }

  renderOptions() {
    const options = [];
    this.quantityOptions.forEach(el => {
      options.push(<option key={el}>{el}</option>);
    });

    return options;
  }

  render() {
    const options = this.renderOptions();

    return (
      <div className="form-inline ">
        <label htmlFor="quantity-selector" className="mr-1">
          Quantidade por página:
        </label>
        <select
          id="quantity-selector"
          name="quantity-selector"
          value={this.props.value}
          className="form-control"
          onChange={this.handleQuantityChange}
        >
          {options}
        </select>
      </div>
    );
  }
}
