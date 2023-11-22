import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../../state/cartData";

const CartThanksPage = ({ cart_products, cartcount, name }) => {
  const [theGoods, setTheGoods] = useState(null);
  const [count, setCount] = useState(0);
  const { emptyCart } = useCartStore((store) => ({
    emptyCart: store.emptyCart,
  }));
  useEffect(() => {
    if (!theGoods) {
      setTheGoods({ cart_products: cart_products });
      setCount(cartcount);
      emptyCart();
    }
  }, [cart_products, cartcount, dispatch, theGoods]);

  return (
    <main id="pagebody">
      <section id="content">
        {count > 0 ? (
          <div>
            <h2 className="shopHeader">Your order has been received!</h2>
            <div className="content">
              <p>Thank You, {name}!</p>
              <p>
                Your order is complete, You should get an email confirmation from Paypal, soon.
                We'll get your order packed up and in the mail to you as soon as possible. I hope
                you enjoy your goodies and come back again.
              </p>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="shopHeader">Your bag is empty</h2>
            <div className="content">
              <p>
                Oh no! There are no goodies in your bag. Head over to the{" "}
                <Link to="/shop">Gift Shop</Link> to correct the situation.
              </p>
            </div>
          </div>
        )}

        {count > 0 ? (
          <div className="shopSection">
            {theGoods.cart_products.map((item, key) => {
              return (
                <div
                  key={key}
                  className="shopItem">
                  <Link to={`/shop/productpage/${item.id}`}>
                    <img
                      name={"img" + item.id}
                      src={"/shop/" + item.img}
                      alt={item.name}
                      className="shopImg"
                    />
                  </Link>
                  <div className="shopShDec">
                    <Link to={`/shop/productpage/${item.id}`}>{item.name}</Link>
                    <div className="cartNum ">
                      <b>X {item.qty} </b>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default CartThanksPage;
