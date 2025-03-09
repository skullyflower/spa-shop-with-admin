import { Link } from "react-router-dom";
import useSiteStore from "@/state/zustand";

export default function Navigation() {
  const { cart_count } = useSiteStore();
  return (
    <ul className="navbar">
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/blog">Blog</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
      <li id="cartcount">
        <Link
          to="/cart"
          title="Cart">
          {cart_count}
        </Link>
      </li>
    </ul>
  );
}
