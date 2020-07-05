import React from "react";

import "./modal.scss";
import CloseBtn from "../../../img/close.png";

const Modal = (props) => (
  <div className="app-modal">
    <div className="app-modal__background" onClick={props.onModalClose}></div>
    <div className="app-modal__content">
      <div className="app-modal__header">
        <div className="app-modal__title">{props.title}</div>
        <img src={CloseBtn} onClick={props.onModalClose} alt={props.title}/>
      </div>
      {props.children}
    </div>
  </div>
);

export default Modal;
