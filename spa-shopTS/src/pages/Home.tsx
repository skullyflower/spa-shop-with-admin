import React from "react";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { ProductList } from "../components/ProductList";
import { useCartStore } from "../state/cartData";
import { products } from "../state/shopDataold";

const Home: React.FC = () => {
  const { cart_products } = useCartStore();

  return (
    <div>
      <Header title="Welcome to the Spa Shop" />
      <main>
        <h1>Featured Products</h1>
        <ProductList products={products} />
        {cart_products.length > 0 && (
          <div>
            <h2>Your Cart</h2>
            <ProductList products={cart_products} />
          </div>
        )}
      </main>
      <Footer copyright="© 2023 Spa Shop" />
    </div>
  );
};

export default Home;
