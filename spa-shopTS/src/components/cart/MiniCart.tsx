import { Link } from "react-router-dom";
import useSiteStore from "@/state/zustand";
import CartItemLine from "./CartItemRow";

const MiniCart = () => {
  const { cart_count, cart_total, cart_products, cartopen, closeCart } = useSiteStore(
    (store) => store,
  );
  //const theme = siteData.site_theme;
  // const variation = theme === "halloween" ? theme : "";

  const reverse_products = cart_products?.reverse();

  return (
    <div className={cartopen ? "show" : ""}>
      <div
        id="overlay"
        onClick={closeCart}></div>
      <div id="mycart">
        <div id="mycartinner">
          <div id="myCartTop">
            <h1>
              {/* <img
                alt="the Goodie Bag"
                src={
                  cart_count > 0
                    ? `/images/${variation}GoodieBagFull.png`
                    : `/images/${variation}GoodieBagEmpty.png`
                }
              /> */}
              <span>
                {cart_count} Goodie{cart_count !== 1 && "s"} in Your Bag
              </span>
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
                <div>
                  <div className="totRow">
                    <b>Subtotal:</b> <span className="cartTot">{"$" + cart_total.toFixed(2)}</span>
                  </div>
                </div>
                <div id="mini_cart_buttons">
                  <Link
                    className="button shopButt checkout"
                    to="/cart"
                    onClick={closeCart}>
                    Checkout
                  </Link>
                  <button
                    className="button shopButt"
                    onClick={closeCart}>
                    Keep shopping
                  </button>
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
