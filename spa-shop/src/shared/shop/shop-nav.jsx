import { Link } from "react-router-dom";
import { categories } from "../../state/shopData";

const ShopHorizontalNav = ({ activecat }) => {
  return (
    <div className="shopSection catlist">
      {categories.map((cat, i) => (
        <Link
          key={i}
          className="shopButt"
          to={"/shop/" + cat.id}>
          {cat.name}
        </Link>
      ))}
    </div>
  );
};
export default ShopHorizontalNav;
