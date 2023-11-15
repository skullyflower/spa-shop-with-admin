import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { filterRandomResults } from "../../data/shopData.js";
import ListProduct from "./oneprod.jsx";
import products from "./products.json";
import categories from "./categories.json";

const ProdList = ({ cat, multi, pId }) => {
  const search_filter = "";
  const prodsort = "";
  const [filtered, setFiltered] = useState([]);
  const category = cat ? categories.categories[cat] : categories.categories["thing"];

  useEffect(() => {
    const cat_id = cat ? cat : "thing";

    const all_products_list = products.products;
    if (all_products_list.length !== 0) {
      const raw_prod_list = all_products_list.filter((prod) => {
        if (prod) {
          if (search_filter !== "" && !multi) {
            return (
              prod.name?.toLowerCase().includes(search_filter.toLowerCase()) ||
              prod.desc?.toLowerCase().includes(search_filter.toLowerCase)
            );
          } else {
            return prod.cat?.includes(cat_id);
          }
        }
        return false;
      });

      const filtered_product_list = filterRandomResults(raw_prod_list, multi, pId, prodsort);
      setFiltered(filtered_product_list);
    }
  }, [cat, multi, pId, prodsort, search_filter]);
  const toUrl = "/giftshop/" + cat;

  if (filtered && filtered.length) {
    return (
      <div className="shopSection">
        {multi ? (
          <div className="shopHeader">
            <Link to={toUrl}>{category?.name}</Link>
          </div>
        ) : (
          ""
        )}
        {filtered.map((item, idx) => {
          return (
            <ListProduct
              key={idx}
              item={item}
            />
          );
        })}
        {multi ? (
          <p className="textright">
            <Link to={toUrl}>See More {category.name}</Link>
          </p>
        ) : (
          ""
        )}
      </div>
    );
  } else if (search_filter !== "") {
    return (
      <p style={{ fontSize: "1.5em" }}>No Results for search term: &quot;{search_filter}&quot;</p>
    );
  } else {
    return null;
  }
};

export default ProdList;

ProdList.propTypes = {
  cat: PropTypes.string,
  multi: PropTypes.bool,
  pId: PropTypes.string,
};
