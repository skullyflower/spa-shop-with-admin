import { Link } from "react-router-dom";
import { getCartCount } from "../../data/cartData";

const CartCount = () => {
  const cartcount = getCartCount();
  return (
    <div className="shopad cart">
      <div
        id="goodieBag"
        className={cartcount > 0 ? "full" : ""}>
        <Link to="/cart">
          <span id="tally">{cartcount} </span>
        </Link>
      </div>
    </div>
  );
};

export default CartCount;
