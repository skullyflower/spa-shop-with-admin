import { useEffect, useState } from "react";
import { useCartStore } from "../../state/cartData.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListProduct from "./one-product.jsx";
import { products, categories, filterRandomResults } from "../../state/shopData.js";

const ProdList = ({ cat, multi, pId }) => {
  const { searchTerm, prodsort } = useCartStore((store) => ({
    searchTerm: store.searchTerm,
    prodsort: store.prodsort,
  }));
  const [filtered, setFiltered] = useState([]);
  const category = categories.find((oneCat) => oneCat.id === cat) ?? categories[0];

  useEffect(() => {
    const cat_id = cat;

    const all_products_list = products;
    if (all_products_list.length !== 0) {
      const raw_prod_list = all_products_list.filter((prod) => {
        if (prod) {
          if (searchTerm !== "" && !multi) {
            return (
              prod.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              prod.desc?.toLowerCase().includes(searchTerm.toLowerCase())
            );
          } else if (cat_id) {
            return prod.cat?.includes(cat_id);
          } else {
            return all_products_list;
          }
        }
        return false;
      });

      const filtered_product_list = filterRandomResults(raw_prod_list, multi, pId, prodsort);
      setFiltered(filtered_product_list);
    }
  }, [cat, multi, pId, prodsort, searchTerm]);
  const toUrl = "/shop/" + cat;

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
  } else if (searchTerm !== "") {
    return (
      <p style={{ fontSize: "1.5em" }}>No Results for search term: &quot;{searchTerm}&quot;</p>
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
