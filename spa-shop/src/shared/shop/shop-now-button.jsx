import { Link } from "react-router-dom";

function ShopNowButton() {
  return (
    <Link
      href="/shop"
      className="shop-now-button">
      Shop Now &gt;
    </Link>
  );
}

export default ShopNowButton;
