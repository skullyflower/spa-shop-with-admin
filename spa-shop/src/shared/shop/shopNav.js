import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getRegularCats, getSuperCats } from "../data/shopData";

export const ShopHorizontalNav = ({ activecat }) => {
  const allcats = useSelector((state) => state.shop.categories);
  const regular_cats = getRegularCats(allcats);
  return (
    <div className="shopSection catlist">
      {regular_cats.map((cat, i) => (
        <Link
          key={i}
          className="shopButt"
          to={"/giftshop/" + cat.id}>
          {cat.name}
        </Link>
      ))}
    </div>
  );
};
const SuperCategoryNav = ({ cat, allcats }) => {
  const { id, img, name, subcat } = cat;
  return (
    <div className="oneChunk">
      <h3>
        <Link to={`/giftshop/${id}`}>{name}</Link>
      </h3>
      <Link to={`/giftshop/${id}`}>
        <img
          name={id}
          alt={name}
          className="shopImg"
          src={"/shop/GROUPS/" + img}
        />
      </Link>
      <br />
      {subcat.map((c, i) => {
        let sc = allcats[c];
        return sc !== undefined ? (
          <span
            key={i}
            className="catButton">
            <Link
              className="shopButt"
              to={"/giftshop/" + c}>
              {sc.name}
            </Link>
          </span>
        ) : (
          ""
        );
      })}
    </div>
  );
};

const ShopNav = () => {
  const allcats = useSelector((state) => state.shop.categories);
  const shopExpanded = useSelector((state) => state.display.shop_nav_expanded);

  if (allcats) {
    const super_cats = getSuperCats(allcats);
    return (
      <div className={shopExpanded ? "shopad shop expanded" : "shopad shop"}>
        <header>
          <h4>
            <Link to={"/giftshop/"}>
              <span className="full-only">Visit the </span>shop
            </Link>
          </h4>
        </header>
        {super_cats.map((cat, index) => {
          return cat ? (
            <SuperCategoryNav
              key={index}
              cat={cat}
              allcats={allcats}
            />
          ) : (
            ""
          );
        })}
        <header>
          <h4>
            <a
              href="http://tee.pub/lic/-HLFNZ0HzPE"
              target="Tee Public">
              <span className="full-only">Visit the </span>Shirt Shop
            </a>
          </h4>
        </header>
        <div className="oneChunk">
          <a
            href="http://tee.pub/lic/-HLFNZ0HzPE"
            target="Tee Public">
            <img
              src="/images/LegsTheSpiderShirt.jpg"
              alt="Visit the Skully Flower Shirt Shop!"
            />
          </a>
          <br />
        </div>
      </div>
    );
  }
};

export default ShopNav;
