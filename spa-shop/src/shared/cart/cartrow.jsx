import React from "react";
import { Link } from "react-router-dom";
import { CartPlusMinusButtons } from "./cartPlusMinusButtons";
import ImageLoader from "../image-loader";

const CartItemLine = ({ item, openCart }) => {
  return (
    <div className="cartRow">
      <div className="cartImg">
        <ImageLoader
          src={"/shop/" + item.img}
          alt={item.name}
          width={75}
        />
      </div>
      <div className="cartTitle ">
        <Link to={`/shop/productpage/${item.id}`}>{item.name}</Link>
        <div className="cartPrice">
          <b>Price:</b> {"$" + item.price.toFixed(2)}
        </div>
      </div>
      <div className="cartNum ">
        <b>QTY:</b> {item.qty}
        <CartPlusMinusButtons
          itemId={item.id}
          hidePlus={item.cat.indexOf("original_art") !== -1}
          openCart={openCart}
        />
      </div>
      <div
        style={{ display: "inline-block" }}
        className="totRow">
        {"$" + (item.qty * item.price).toFixed(2)}
      </div>
    </div>
  );
};
export default CartItemLine;
