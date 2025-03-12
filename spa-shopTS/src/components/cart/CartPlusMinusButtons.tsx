import useSiteStore from "@/state/zustand";

interface CartPlusMinusButtonsProps {
  itemId: string;
  hidePlus: boolean;
  openCart: boolean;
}
const CartPlusMinusButtons = ({
  itemId,
  hidePlus = false,
  openCart,
}: CartPlusMinusButtonsProps) => {
  const { addToCart, deleteFromCart } = useSiteStore((store) => store);
  const onAdd = (itemId: string) => () => {
    addToCart(itemId, openCart);
  };
  const onDelete = (itemId: string) => () => {
    deleteFromCart(itemId, openCart);
  };
  return (
    <span className="cartAdd">
      <button
        onClick={onAdd(itemId)}
        className={hidePlus ? "hide" : ""}>
        +
      </button>
      <button onClick={onDelete(itemId)}>-</button>
    </span>
  );
};
export default CartPlusMinusButtons;
