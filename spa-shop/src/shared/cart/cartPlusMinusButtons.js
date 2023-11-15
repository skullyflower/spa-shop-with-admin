import React from "react";
import { useDispatch } from "react-redux";
import { updatecart } from "../data/cartSlice";
import { addToCart, deleteFromCart } from "../data/cartData";

export const CartPlusMinusButtons = ({ itemId, hidePlus = false, openCart }) => {
  const dispatch = useDispatch();
  const onAdd = (itemId) => () => {
    const newCart = addToCart(itemId, openCart);
    dispatch(updatecart(newCart));
  };
  const onDelete = (itemId) => () => {
    const newCart = deleteFromCart(itemId, openCart);
    dispatch(updatecart(newCart));
  };
  return (
    <span className="cartAdd">
      <button onClick={onAdd(itemId)} className={hidePlus ? "hide" : ""}>
        +
      </button>
      <button onClick={onDelete(itemId)}>-</button>
    </span>
  );
};
