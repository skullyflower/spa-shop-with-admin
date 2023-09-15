import React from "react";
import { Link } from "react-router-dom";

const NavBar = ({ activepath }) => {
  return (
    <ul className="navbar">
      <li className={activepath === "home" ? "active" : undefined}>
        <Link to="/">Home</Link>
      </li>
      <li className={activepath === "about" ? "active" : undefined}>
        <Link to="/about">About</Link>
      </li>
      <li className={activepath === "blog" ? "active" : undefined}>
        <Link to="/blog">Blog</Link>
      </li>
      <li className={activepath === "images" ? "active" : undefined}>
        <Link to="/images">Image Upload</Link>
      </li>
      <li className={activepath === "products" ? "active" : undefined}>
        <Link to="/products">Products</Link>
      </li>
      <li className={activepath === "categories" ? "active" : undefined}>
        <Link to="/categories">Categories</Link>
      </li>
      <li className={activepath === "sale" ? "active" : undefined}>
        <Link to="/sale">Sale</Link>
      </li>
    </ul>
  );
};

export default NavBar;
