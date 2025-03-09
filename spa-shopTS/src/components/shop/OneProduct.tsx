import { Link } from "react-router-dom";
import { AddToCartButton, ExternalProdButton } from "./AddToCartButton";
import ImageLoader from "@/components/ImageLoader";
import { productType } from "@/state/shopData";

const ProductBox = ({ item }: { item: productType }) => {
  return (
    <div className="shopItem">
      <Link to={"/productpage/" + item.id}>
        <ImageLoader
          src={"/shop/" + item.img}
          alt={item.name}
        />
      </Link>
      <div>
        <div className="shopShDec">
          <Link to={"/productpage/" + item.id}>{item.name}</Link>
        </div>
        <div className="shopPrice">
          {item.soldout ? "Sold Out" : `$${Number(item.price).toFixed(2)}`}
        </div>
        <p>
          {!item.soldout &&
            (item.externalLink ? (
              <ExternalProdButton url={item.externalLink} />
            ) : (
              <AddToCartButton itemId={item.id} />
            ))}
        </p>
      </div>
    </div>
  );
};

export default ProductBox;
