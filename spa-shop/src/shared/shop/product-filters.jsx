import React from "react";
import SortBox from "../sort-box";
import SearchBox from "../Search-box";
import ShopHorizontalNav from "./shop-nav";

const ShopFilter = () => {
  return (
    <div id="filterControls">
      <SortBox />
      <ShopHorizontalNav />
      <SearchBox />
    </div>
  );
};
export default ShopFilter;
