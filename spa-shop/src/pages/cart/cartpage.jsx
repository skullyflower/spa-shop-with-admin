import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useCartStore } from "../../state/cartData";
import { sale } from "../../state/shopData";
import Processing from "../../shared/processing";
import CartItemLine from "../../shared/cart/cartrow";
import ProdList from "../../shared/shop/product-list";
import CartThanksPage from "./thankspage";

const paypal = window.paypal;
const PayPalButton = paypal?.Buttons.driver("react", { React, ReactDOM });

const CartPage = (props) => {
  const [name, setName] = useState("");
  const [orderStatus, setOrderStatus] = useState("cart");
  const [ppdata, setPpdata] = useState({});
  const { cart_count, cart_products, shipping, cart_total } = useCartStore((state) => ({
    cart_count: state.cart_count,
    cart_products: state.cart_products,
    shipping: state.shipping,
    cartopen: state.cartopen,
    cart_total: state.cart_total,
  }));
  const totalSale = cart_total * sale;
  const reverse_products = cart_products.slice().reverse();

  useEffect(() => {
    const getCartTogether = () => {
      if (cart_products.length !== 0) {
        const ppitems = cart_products.map((item) => {
          return {
            name: item.name,
            sku: item.id,
            quantity: item.qty,
            unit_amount: {
              currency_code: "USD",
              value: (item.price * (1 - sale)).toFixed(2).toString(),
            },
          };
        });
        const ppdata = {
          items: ppitems,
          amount: {
            breakdown: {
              item_total: {
                currency_code: "USD",
                value: cart_total * (1 - sale).toFixed(2).toString(),
              },
              shipping: {
                currency_code: "USD",
                value: shipping.toFixed(2).toString(),
              },
            },
            value: (cart_total - totalSale + shipping).toFixed(2).toString(),
          },
        };
        setPpdata(ppdata);
      }
    };
    getCartTogether();
  }, [cart_products, cart_total, totalSale, sale, shipping]);

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [ppdata],
    });
  };

  const onApprove = (data, actions) => {
    setOrderStatus("processing");
    return actions.order.capture().then((details) => {
      // Load thanks view.
      setName(details.payer.name.given_name);
      setOrderStatus("complete");
    });
  };
  const onError = (data, actions) => {
    setOrderStatus("cart");
    alert("There was a problem processing your payment. Please try again.");
  };

  return orderStatus === "complete" ? (
    <CartThanksPage
      cart_products={cart_products}
      cartcount={cart_count}
      name={name}
    />
  ) : (
    <section
      id="content"
      className="checkout">
      {cart_count > 0 ? (
        <>
          <h2 className="shopHeader">Checkout</h2>
          <Processing inprog={orderStatus === "processing"} />
        </>
      ) : (
        <h2
          className="shopHeader"
          style={{ fontSize: "2em" }}>
          Your cart is empty
        </h2>
      )}
      <div className="checkout">
        {reverse_products && reverse_products.length !== 0 && (
          <div>
            {reverse_products.map((item, key) => {
              return (
                <CartItemLine
                  key={key}
                  item={item}
                  openCart={false}
                />
              );
            })}
          </div>
        )}
        <div className={cart_count > 0 ? "cartRow payRow" : "hide"}>
          <div>
            <div className="totRow">
              <b>Subtotal:</b>
              <span className="cartTot">{"$" + cart_total.toFixed(2)}</span>
            </div>
            <div className={sale > 0 ? "totRow" : "hide"}>
              <b>Sale:</b>
              <span className="cartTot">{"-$" + totalSale.toFixed(2)}</span>
            </div>
            <div className="totRow">
              <b>U.S. Ship Est:</b>
              <span className="cartTot">{"$" + shipping.toFixed(2)}</span>
            </div>
            <div className="totRow">
              <b>Total:</b>
              <span className="cartTot">
                {"$" + (cart_total - totalSale + shipping).toFixed(2)}
              </span>
            </div>
          </div>
          <div className="paybuttonDiv">
            <PayPalButton
              createOrder={(data, actions) => createOrder(data, actions)}
              onApprove={(data, actions) => onApprove(data, actions)}
              onError={(data, actions) => onError(data, actions)}
            />
          </div>
        </div>
      </div>
      <ProdList
        cart_productsort={props.productsort}
        cat="all"
        multi={true}
      />
    </section>
  );
};

export default CartPage;
