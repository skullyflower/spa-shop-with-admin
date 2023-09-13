import { Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import HomePage from "../../pages/home/homepage";
import AboutPage from "../../pages/about/aboutpage";
import ShopPage from "../../pages/shop/shoppage";
import CartPage from "../../pages/cart/cartpage";
import ContactPage from "../../pages/contact/contactpage";
import BlogPage from "../../pages/blog/blogpage";

export default function SiteRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Layout />}>
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path="/shop"
          element={<ShopPage />}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        <Route
          path="/blog"
          element={<BlogPage />}
        />
        <Route
          path="/contact"
          element={<ContactPage />}
        />
        <Route
          path="*"
          element={<AboutPage />}
        />
      </Route>
    </Routes>
  );
}
