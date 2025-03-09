import useSiteStore from "@/state/zustand";
import { SearchBox } from "@/components/SearchBox";
import { ChangeEvent } from "react";

const ShopFilter = () => {
  const { prodsort, updateSort } = useSiteStore();
  const updateSortValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const sort_string = e.target.value;
    updateSort(sort_string);
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
