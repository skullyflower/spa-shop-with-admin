import { Link } from "react-router-dom";
import useSiteStore from "@/store/zustand";

const CartCount = () => {
  const cartcount = useSiteStore((state) => state.cart_count);
  const cartTotal = useSiteStore((state) => state.cart_total);
  return (
    <div className="shopad cart">
      <div
        id="goodieBag"
        className={cartcount > 0 ? "full" : ""}>
        <Link to="/cart">
          <span id="tally">{cartcount} </span>
          <span>goodie{cartcount !== 1 && "s"}</span> <span> @ </span>
          {cartTotal ? "$" + cartTotal.toFixed(2) : "$0"}
        </Link>
      </div>
    </div>
  );
};

export default CartCount;
