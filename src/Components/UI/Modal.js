import { Fragment } from "react";
import ReactDOM from "react-dom";

import styled from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={styled.backdrop}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={styled.modal}>
      <div className={styled.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
