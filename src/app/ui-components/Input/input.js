import React from "react";

import "./input.scss";

const Input = (props) => (
  <div className="app-input">
    <div className="app-input__label">{props.label}</div>
    <div className="app-input__type">
      <input
        type={props.type}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder || "Please enter value"}
      ></input>
    </div>
  </div>
);

export default Input;
