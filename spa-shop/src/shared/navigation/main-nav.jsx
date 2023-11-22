import { Link } from "react-router-dom";
import { useCartStore } from "../../state/cartData";

export default function MainNavigation() {
  const activepath = "/about";
  const cart_count = useCartStore((state) => state.cart_count);
  return (
    <ul className="navbar">
      <li className={activepath === "/" ? "active" : undefined}>
        <Link to="/">Home</Link>
      </li>
      <li className={activepath === "/shop" ? "active" : undefined}>
        <Link to="/shop">Shop</Link>
      </li>
      <li className={activepath === "/about" ? "active" : undefined}>
        <Link to="/about">About</Link>
      </li>
      <li className={activepath === "/blog" ? "active" : undefined}>
        <Link to="/blog">Blog</Link>
      </li>
      <li className={activepath === "/contact" ? "active" : undefined}>
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
