import React from "react";
import useSiteStore from "@/state/zustand";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductList from "../components/ProductList";

const Cart: React.FC = () => {
  const { cart_products, cart_total, shipping, handling, cartopen, emptyCart } = useSiteStore();

  const handleEmptyCart = () => {
    emptyCart();
  };

  return (
    <div>
      <Header title="Shopping Cart" />
      <main>
        {cartopen ? (
          <>
            <h2>Your Cart</h2>
            <ProductList products={cart_products} />
            <div>
              <h3>Order Summary</h3>
              <p>Total: ${cart_total.toFixed(2)}</p>
              <p>Shipping: ${shipping.toFixed(2)}</p>
              <p>Handling: ${handling.toFixed(2)}</p>
              <button onClick={handleEmptyCart}>Empty Cart</button>
            </div>
          </>
        ) : (
          <h2>Your cart is currently closed.</h2>
        )}
      </main>
      <Footer copyright="© 2023 Your Company" />
    </div>
  );
};

export default Cart;
