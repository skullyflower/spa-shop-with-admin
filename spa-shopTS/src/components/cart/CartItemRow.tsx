import { Link } from "react-router-dom";
import CartPlusMinusButtons from "./CartPlusMinusButtons";
import { productType } from "@/state/shopData";

const CartItemRow = ({ item, openCart }: { item: productType; openCart: boolean }) => {
  return (
    <div className="cartRow">
      <div className="cartImg">
        <img
          src={"/shop/" + item.img}
          alt={item.name}
        />
      </div>
      <div className="cartTitle ">
        <Link to={"/productpage/" + item.id}>{item.name}</Link>
        <div className="cartPrice">
          <b>Price:</b> {"$" + item.price.toFixed(2)}
        </div>
      </div>
      <div className="cartNum ">
        <b>QTY:</b> {item.qty}
        <CartPlusMinusButtons
          itemId={item.id}
          hidePlus={item.cats.indexOf("original_art") !== -1}
          openCart={openCart}
        />
      </div>
      <div
        style={{ display: "inline-block" }}
        className="totRow">
        <b>Item Total</b>
        <br />
        {"$" + (item.qty ?? 0 * item.price).toFixed(2)}
      </div>
    </div>
  );
};
export default CartItemRow;
