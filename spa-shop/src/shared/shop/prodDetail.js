import { AddToCartButton } from "./addToCartButton";
import ImageLoader from "../image-loader";

const prodDetail = ({ item }) => {
  const biggerImage = item.img.replace(/^(.*)[/]([^/]*)$/, "$1/bigger/$2");
  return (
    <div>
      <div className="shopSection">
        <h2 className="shopHeader">Product Detail: {item.name}</h2>
        <div className="shopDetail product">
          <div className="deptImg product">
            <a
              rel="shadowbox[alts]"
              href={"/shop/" + biggerImage}>
              <ImageLoader
                src={"/shop/" + biggerImage}
                alt={item.name}
              />
            </a>
            <div className="shopAlts">
              {item.altimgs
                ? item.altimgs.map((alt, indx) => {
                    const biggerAlt = alt.replace(/^(.*)[/]([^/]*)$/, "$1/bigger/$2");
                    return (
                      <a
                        key={indx}
                        rel="shadowbox[alts]"
                        href={"/shop/" + biggerAlt}>
                        <ImageLoader
                          style={{ width: "120px" }}
                          className="thmb"
                          src={"/shop/" + biggerAlt}
                          alt={item.name}
                        />
                      </a>
                    );
                  })
                : ""}
            </div>
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
