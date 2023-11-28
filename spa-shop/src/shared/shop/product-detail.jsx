import AddToCartButton from "./add-to-cart-button";
import ImageLoader from "../image-loader";

const prodDetail = ({ item }) => {
  const biggerImage = item.img.replace(/^(.*)[/]([^/]*)$/, "$1/bigger/$2");
  return (
    <div>
      <div className="shopSection">
        <h2 className="shopHeader">Product Detail: {item.name}</h2>
        <div className="shopDetail expanded product">
          <div className="deptImg product">
            <a
              rel="shadowbox[alts]"
              href={biggerImage}>
              <ImageLoader
                src={biggerImage}
                alt={item.name}
              />
            </a>
          </div>
          <div className="shopblurb product">
            <h3>{item.name}</h3>
            <div dangerouslySetInnerHTML={{ __html: item.desc }} />
            <div dangerouslySetInnerHTML={{ __html: item.desc_long }} />
            <div className="shopPrice">
              {item.soldout ? "Sold Out" : `$${Number(item.price).toFixed(2)}`}
            </div>
            <AddToCartButton itemId={item.id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default prodDetail;
