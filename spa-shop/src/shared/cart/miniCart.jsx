import React from "react";
import { Link } from "react-router-dom";
import CartItemLine from "./cartrow";
import { useCartStore } from "../../state/cartData";

const MiniCart = () => {
  const { cart_count, cart_products, cartopen, cart_total, closeCart } = useCartStore((state) => ({
    cart_count: state.cart_count,
    cart_products: state.cart_products,
    cartopen: state.cartopen,
    cart_total: state.cart_total,
    closeCart: state.closeCart,
  }));
  const reverse_products = cart_products?.slice().reverse();
  return (
    <div className={cartopen ? "show" : ""}>
      <div
        id="overlay"
        onClick={closeCart}></div>
      <div id="mycart">
        <div id="mycartinner">
          <div id="myCartTop">
            <h1>
              <span>{cart_count} item(s) in Your Bag</span>
              <button
                className="close right"
                onClick={closeCart}>
                [x]
              </button>
            </h1>
          </div>
          {cart_products && cart_products.length !== 0 && (
            <>
              <section id="myCartContent">
                {cart_count > 0 ? (
                  reverse_products.map((item, key) => {
                    return (
                      <CartItemLine
                        key={key}
                        item={item}
                        openCart={true}
                      />
                    );
                  })
                ) : (
                  <h3>cart is empty</h3>
                )}
              </section>
              <div
                id="myCartBottom"
                style={{ border: "none" }}>
                <div className="totRow">
                  <b>Subtotal:</b> <span className="cartTot">{"$" + cart_total.toFixed(2)}</span>
                </div>
                <div id="mini_cart_buttons">
                  <Link
                    className="button shopButt checkout"
                    to="/cart"
                    onClick={closeCart}>
                    Checkout
                  </Link>
                  <a
                    className="button shopButt clickable"
                    onClick={closeCart}>
                    Keep shopping
                  </a>
                </div>
              </div>
            </>
          )}
          {cart_count === 0 && <h1>Sorry, there is nothing in your bag.</h1>}
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
