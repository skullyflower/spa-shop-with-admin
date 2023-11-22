import { Link } from "react-router-dom";
import { categories } from "../../state/shopData";
import { useParams } from "react-router-dom";

const ShopHorizontalNav = () => {
  const { category_id } = useParams();
  return (
    <div className="shopSection catlist">
      {categories
        .filter((cat) => cat.id !== "all")
        .map((cat, i) => (
          <Link
            key={i}
            className={category_id === cat.id ? "active" : ""}
            to={"/shop/" + cat.id}>
            {cat.name}
          </Link>
        ))}
    </div>
  );
};
export default ShopHorizontalNav;
