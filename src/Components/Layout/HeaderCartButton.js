import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styled from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const ctx = useContext(CartContext);
  const [btnIsHighlight, setBtnIsHighlight] = useState(false);
  const numberOfCartItems = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const { items } = ctx;
  const btnClass = `${styled.button} ${btnIsHighlight ? styled.bump : ""}`;
  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlight(true);
    const timer = setTimeout(() => {
      setBtnIsHighlight(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={styled.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={styled.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
