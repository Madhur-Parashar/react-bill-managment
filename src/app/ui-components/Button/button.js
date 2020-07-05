import React from "react";

import "./button.scss";

const Button = (props) => (
  <button
    className={`btn ${props.disable ? "btn-disable" : ""}`}
    onClick={props.onClick}
    disabled={props.disable}
  >
    <span className="btn__label">{props.children}</span>
  </button>
);

export default Button;
