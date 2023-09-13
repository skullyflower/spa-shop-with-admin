import { Link } from "react-router-dom";

export default function MainNavigation() {
  const activepath = "/about";

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
      <li>
        <Link
          to="/cart"
          id="cartcount">
          1
        </Link>
      </li>
    </ul>
  );
}
