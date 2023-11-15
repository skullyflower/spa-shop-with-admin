import React from "react";
import ImageLoader from "../bits/image-loader";

const CategoryHeader = ({ category, isDesignPage }) => {
  const { name, img, description } = category;
  const imgBigger = img.replace("/", "/bigger/");
  return (
    <div>
      <div className="content deptDesc">
        <h2 className="shopHeader">
          <span className="full-only">The Shop: </span>
          {name}
        </h2>
        <div className="shopDetail">
          <div className="deptImg">
            <ImageLoader
              alt={name}
              src={"/shop/GROUPS/" + imgBigger}
            />
          </div>
          <div className="shopBlurb">
            <div
              className="deptTxt"
              dangerouslySetInnerHTML={{
                __html: description,
              }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CategoryHeader;
