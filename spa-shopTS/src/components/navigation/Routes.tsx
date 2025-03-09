import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/Home";
import AboutPage from "@/pages/About";
import ProductPage from "@/pages/Product";
import ShopPage from "@/pages/Shop";
import CartPage from "@/pages/Cart";
// import ContactPage from "@/pages/Contact";
// import BlogPage from "@/pages/blog";
// import BlogEntryPage from "@/pages/blog/Entry";

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
          path="/shop/:category_id"
          element={<ShopPage />}
        />
        <Route
          path="/shop/product/:prod_id"
          element={<ProductPage />}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="/cart"
          element={<CartPage />}
        />
        {/* <Route
          path="/blog"
          element={<BlogPage />}
        />
        <Route
          path="/blog/entry/:blog_id"
          element={<BlogEntryPage />}
        />

        <Route
          path="/contact"
          element={<ContactPage />}
        /> */}
        <Route
          path="*"
          element={<AboutPage />}
        />
      </Route>
    </Routes>
  );
}
