import React from "react";
import { useCartStore } from "../../state/cartData";
import SearchBox from "../Search-box";

const ShopFilter = () => {
  const { prodsort, updateSort } = useCartStore();

  const updateSortValue = (e) => {
    const sort_string = e.target.value;
    dispatch(updateSort(sort_string));
  };

  return (
    <div id="filterControls">
      <div className="orderSect">
        <b>Sort by: </b>
        <select
          onChange={updateSortValue}
          value={prodsort}>
          <option value="-date">Newest</option>
          <option value="name">Name</option>
          <option value="price">Least Expensive</option>
          <option value="-price">Most Expensive</option>
        </select>
      </div>
      <SearchBox />
    </div>
  );
};
export default ShopFilter;
