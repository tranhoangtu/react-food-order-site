import { useReducer } from "react";
import CartContext from "./cart-context";

const CartProvider = (props) => {
  const defautCartState = {
    items: [],
    totalAmount: 0,
  };
  const cartReducer = (state, action) => {
    if (action.type === "ADD") {
      const totalAmount =
        state.totalAmount + action.item.amount * action.item.price;
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      const existingCartItem = state.items[existingItemIndex];
      let updatedItems;
      let updatedItem;

      if (existingCartItem) {
        updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
      return {
        items: updatedItems,
        totalAmount: totalAmount,
      };
    }

    if (action.type === "REMOVE") {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );

      const existingCartItem = state.items[existingItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      console.log(existingCartItem);
      let updatedItems;
      if (existingCartItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = updatedItem;
      }
      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount,
      };
    }

    if (action.type === "CLEAR") {
      return defautCartState;
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

  const clearCartHandler = () => {
    dispatchCartAction({ type: "CLEAR" });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
    clearItem: clearCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;
