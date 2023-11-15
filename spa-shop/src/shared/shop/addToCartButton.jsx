import PropTypes from "prop-types";

import { addToCart } from "../../data/cartData";

export default function AddToCartButton({ itemId }) {
  const onAdd = (itemId) => () => {
    addToCart(itemId, true);
  };

  return (
    <button
      className="shopButt"
      type="button"
      onClick={onAdd(itemId)}>
      Add to Bag
    </button>
  );
}

AddToCartButton.propTypes = {
  itemId: PropTypes.string,
};
