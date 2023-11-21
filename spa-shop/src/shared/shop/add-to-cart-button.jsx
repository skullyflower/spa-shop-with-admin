import PropTypes from "prop-types";

import { useCartStore } from "../../state/cartData";

export default function AddToCartButton({ itemId }) {
  const { addToCart } = useCartStore();
  const onAdd = (itemId) => () => {
    addToCart(itemId, true);
  };

  return (
    <button
      className="add-to-bag"
      type="button"
      onClick={onAdd(itemId)}>
      Add to Bag
    </button>
  );
}

AddToCartButton.propTypes = {
  itemId: PropTypes.string,
};
