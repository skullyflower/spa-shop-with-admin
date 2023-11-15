import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import AddToCartButton from "./addToCartButton";
import ImageLoader from "../image-loader";

const ListProduct = ({ item }) => {
  return (
    <div className="shopItem">
      <Link to={"/productpage/" + item.id}>
        <ImageLoader
          name={"img" + item.id}
          src={"/shop/" + item.img}
          alt={item.name}
          className="shopImg"
        />
      </Link>
      <div>
        <div className="shopShDec">
          <Link to={"/productpage/" + item.id}>{item.name}</Link>
        </div>
        <div className="shopPrice">
          {item.soldout ? "Sold Out" : `$${Number(item.price).toFixed(2)}`}
        </div>
        {!item.soldout && <AddToCartButton itemId={item.id} />}
      </div>
    </div>
  );
};

export default ListProduct;
ListProduct.propTypes = {
  item: PropTypes.object,
};
