import React from "react";

const TextField = props => {

  const handleValueChange = e => {
    const textInput = e.target;
    props.handleValueChange(textInput.value);
  };

  const placeholder = props.placeholder || "";

  return (
    <div>
      <label className="sr-only" htmlFor="text-field">
        {placeholder}
      </label>
      <input
        id="text-field"
        type="text"
        className="form-control"
        value={props.value}
        onChange={handleValueChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextField;
