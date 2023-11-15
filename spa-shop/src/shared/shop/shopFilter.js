import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSort } from "../data/displaySlice";
import { SearchBox } from "../bits/SearchBox";

const ShopFilter = () => {
  const dispatch = useDispatch();
  const updateSortValue = (e) => {
    const sort_string = e.target.value;
    dispatch(updateSort(sort_string));
  };
  const prodsort = useSelector((state) => state.display.product_sort);

  return (
    <div id="filterControls">
      <div className="orderSect">
        <b>Sort by: </b>
        <select onChange={updateSortValue} value={prodsort}>
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
