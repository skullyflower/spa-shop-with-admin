import { categoryType } from "@/state/shopData";
import { useState } from "react";

interface CategoryHeaderProps {
  category: categoryType;
}

const CategoryHeader = ({ category }: CategoryHeaderProps) => {
  const { name, description } = category;
  const [showmore, setShowmore] = useState(false);
  const toggleDescription = () => {
    setShowmore(!showmore);
  };
  return (
    <div>
      <div className="content deptDesc">
        <h2 className="shopHeader">
          <span className="full-only">The Shop: </span>
          {name}
          <span
            style={{ padding: "0 20px", float: "right" }}
            className="clickable"
            onClick={toggleDescription}>
            {showmore ? <span>⌃</span> : <span>⌵</span>}
          </span>
        </h2>
        {showmore && (
          <div>
            <div className="shopBlurb">
              <div
                className="deptTxt"
                dangerouslySetInnerHTML={{
                  __html: description,
                }}></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CategoryHeader;
