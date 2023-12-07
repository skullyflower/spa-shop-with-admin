import { Suspense, lazy } from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./bits/NavBar";
import "./AppLayout.scss";
import "./AppTheme.scss";
import "react-quill/dist/quill.snow.css";

const Homepage = lazy(() => import("./forms/homepage"));
const Blog = lazy(() => import("./forms/blogpage"));
const Products = lazy(() => import("./forms/products"));
const Categories = lazy(() => import("./forms/categories"));
const PageContent = lazy(() => import("./forms/contentpage"));
const Sale = lazy(() => import("./forms/sale"));
const Images = lazy(() => import("./forms/addimage"));
function App() {
  return (
    <div>
      <div id="main">
        <Router>
          <Suspense fallback={<div className="Loading" />}>
            <header
              id="pagetop"
              style={{ zIndex: 100 }}>
              <Link to="/">
                <img
                  src="/spa-shop-logo.png"
                  className="App-logo"
                  alt="Spa-Shop Admin"
                />
              </Link>
              <div id="topnav">
                <NavBar />
              </div>
            </header>
            <main id="pagebody">
              <section id="content">
                <Routes>
                  <Route
                    exact
                    path="/"
                    element={<Homepage />}
                  />
                  <Route
                    exact
                    path="/about"
                    element={<PageContent />}
                  />
                  <Route
                    exact
                    path="/blog"
                    element={<Blog />}
                  />
                  <Route
                    exact
                    path="/products"
                    element={<Products />}
                  />
                  <Route
                    exact
                    path="/categories"
                    element={<Categories />}
                  />
                  <Route
                    exact
                    path="/sale"
                    element={<Sale />}
                  />
                  <Route
                    exact
                    path="/images"
                    element={<Images />}
                  />
                </Routes>
              </section>
            </main>
            <footer id="pagefoot"></footer>
          </Suspense>
        </Router>
      </div>
    </div>
  );
}

export default App;
