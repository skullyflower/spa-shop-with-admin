import { useState } from "react";
import ImageLoader from "../image-loader";

const CategoryHeader = ({ category, isDesignPage }) => {
  const { name, id, img, description } = category;
  const [expanded, setExpanded] = useState(false);
  const imgBigger = img.replace("/", "/bigger/");
  return (
    <div className="content deptDesc">
      <h1 className="shopHeader">
        {name}{" "}
        <span
          className="smaller clickable"
          onClick={() => setExpanded(!expanded)}>
          ( {expanded && "hide "} details )
        </span>
      </h1>
      <div className={`shopDetail split-even ${expanded ? "expanded" : ""}`}>
        <div className="deptImg">
          <ImageLoader
            alt={name}
            src={`/shop/${id}/${imgBigger}`}
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
  );
};
export default CategoryHeader;
