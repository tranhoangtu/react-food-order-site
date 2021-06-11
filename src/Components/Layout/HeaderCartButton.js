import React from "react";
import CartIcon from "../Cart/CartIcon";
import styled from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={styled.button}>
      <span className={styled.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styled.badge}>3</span>
    </button>
  );
};

export default HeaderCartButton;
