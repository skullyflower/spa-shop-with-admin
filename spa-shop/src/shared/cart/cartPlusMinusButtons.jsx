import React from "react";
import { useCartStore } from "../../state/cartData";

export const CartPlusMinusButtons = ({ itemId, hidePlus = false, openCart }) => {
  const { addToCart, deleteFromCart } = useCartStore();
  const onAdd = (itemId) => () => {
    addToCart(itemId, openCart);
  };
  const onDelete = (itemId) => () => {
    deleteFromCart(itemId, openCart);
  };
  return (
    <>
      <span
        onClick={onAdd(itemId)}
        className={hidePlus ? "hide" : "clickable"}>
        +
      </span>
      <span
        className="clickable"
        onClick={onDelete(itemId)}>
        -
      </span>
    </>
  );
};
