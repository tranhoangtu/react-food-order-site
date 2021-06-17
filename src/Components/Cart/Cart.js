import React, { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styled from "./Cart.module.css";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (data) => {
    setIsSubmitting(true);
    await fetch(
      "https://react-http-adc0c-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: data,
          orderedItems: ctx.items,
        }),
      }
    );
    ctx.clearItem();
    setIsSubmitting(false);
    setDidSubmit(true);
  };
  const cartItems = (
    <ul className={styled["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          id={item.id}
          name={item.name}
          price={item.price}
          amount={item.amount}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modelActions = (
    <div className={styled.actions}>
      <button className={styled["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItem && (
        <button className={styled.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const modalContents = (
    <React.Fragment>
      {cartItems}
      <div className={styled.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <CheckOut onCancel={props.onClose} onConfirm={submitOrderHandler} />
      )}
      {!isCheckout && modelActions}
    </React.Fragment>
  );

  const submittingContent = <p>Sending order data...</p>;
  const didContent = (
    <React.Fragment>
      <p>Order successfully!!!</p>
      <div className={styled.actions}>
        <button className={styled["button"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && modalContents}
      {isSubmitting && submittingContent}
      {!isSubmitting && didSubmit && didContent}
    </Modal>
  );
};

export default Cart;
