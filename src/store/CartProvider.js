import { useReducer } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const defautCartState = {
    items: [],
    totalAmount: 0,
  };
  const cartReducer = (state, action) => {
    if (action.type === "ADD") {
      const updatedItem = state.items.concat(action.item);
      const updatedItemAmount =
        state.totalAmount + action.item.price * action.item.amount;
      return {
        items: updatedItem,
        totalAmount: updatedItemAmount,
      };
    }
  };
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defautCartState
  );
  const addItemHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
