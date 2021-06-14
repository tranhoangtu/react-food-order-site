import { useContext } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import styled from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const ctx = useContext(CartContext);
  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItem = ctx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    ctx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    ctx.addItem({ ...item, amount: 1 });
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

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={styled.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={styled.actions}>
        <button className={styled["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItem && <button className={styled.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
