import useSiteStore from "@/state/zustand";

export const AddToCartButton = ({ itemId }: { itemId: string }) => {
  const { addToCart } = useSiteStore();
  const onAdd = (itemId: string) => () => {
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
};

export const ExternalProdButton = ({ url }: { url: string }) => {
  return (
    <a
      className="shopButt"
      href={url}
      target="externalShop">
      Go get it
    </a>
  );
};
