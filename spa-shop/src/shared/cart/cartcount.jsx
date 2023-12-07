import { Link } from "react-router-dom";
import { useCartStore } from "../../data/cartData";

const CartCount = () => {
  const { cart_count } = useCartStore();
  return (
    <div className="shopad cart">
      <div
        id="goodieBag"
        className={cart_count > 0 ? "full" : ""}>
        <Link to="/cart">
          <span id="tally">{cart_count} </span>
        </Link>
      </div>
    </div>
  );
};

export default CartCount;
