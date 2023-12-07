import React, { useEffect } from "react";
import { useCartStore } from "../../state/cartData";
import { Link } from "react-router-dom";

const MobileMenu = () => {
  const { cart_count, topnavexpanded, changeTopNavVisible } = useCartStore((store) => ({
    cart_count: store.cart_count,
    topnavexpanded: store.topnavexpanded,
    changeTopNavVisible: store.changeTopNavVisible,
  }));
  useEffect(() => {
    if (window.innerWidth <= 771) {
      changeTopNavVisible(false);
    }
  }, []);

  const menuExpander = () => {
    changeTopNavVisible(!topnavexpanded);
  };

  return (
    <div id="minifiedMenu">
      <Link
        className="shopButt"
        to="/shop">
        shop
      </Link>
      <Link
        className="shopButt"
        to="/blog">
        Blog
      </Link>
      <span id="cartcount">
        <Link
          to="/cart"
          title="Cart">
          {cart_count}
        </Link>
      </span>
      <button
        id="menuExpander"
        className="clickable"
        onClick={menuExpander}>
        menu
      </button>
    </div>
  );
};
export default MobileMenu;
