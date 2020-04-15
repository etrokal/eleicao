import React, { useState, useEffect } from "react";
import moment from "moment";

const DateTimeField = ({ name, label, value, handleInputChange }) => {
  const internalDate = moment(value);

  const getDate = () => {
    if (internalDate.isValid()) {
      return internalDate.format("YYYY-MM-DD");
    }
    return "";
  };

  const getTime = () => {
    if (internalDate.isValid()) {
      return internalDate.format("HH:mm:ss");
    }
    return "";
  };

  const [inputDate, setInputDate] = useState(getDate());
  const [inputTime, setInputTime] = useState(getTime());

  const handleStateChange = e => {
    const datetime = `${inputDate}T${inputTime}`;

    if (!moment(datetime).isValid()) {
      return;
    }

    const event = new CustomEvent("customInput", {
      detail: {
        name,
        value: datetime
      }
    });

    handleInputChange(event);
  };

  const handleDateInput = e => {
    e.persist();
    const date = e.target.value;
    setInputDate(date);
  };

  const handleTimeInput = e => {
    e.persist();
    const time = e.target.value;
    setInputTime(time);
  };

  useEffect(() => {
    handleStateChange();
  }, [inputDate, inputTime]);

  return (
    <>
      <div className="form-group row">
        <div className="col-sm-12">
          <label htmlFor={name}>{label}</label>
        </div>
        <div className="col-sm-8">
          <input
            type="date"
            className="form-control"
            required
            value={inputDate}
            onChange={handleDateInput}
            name={name}
          />
        </div>
        <div className="col-sm-4">
          <input
            type="time"
            className="form-control"
            required
            value={inputTime}
            onChange={handleTimeInput}
            name={name}
          />
        </div>
      </div>
    </>
  );
};

export default DateTimeField;
