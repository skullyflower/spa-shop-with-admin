import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { categoriesType, filterRandomResults } from "@/state/shopData";
import ProductBox from "@/components/shop/OneProduct";
import useSiteStore from "@/state/zustand";

interface ProdListProps {
  cat?: string;
  subject?: string;
  multi?: boolean;
  pId?: string;
}
const ProdList = ({ cat, subject, multi, pId }: ProdListProps) => {
  const { products, categories, subjects, prodsort, searchTerm } = useSiteStore();
  const [search_filter, setSearch_filter] = useState("");
  const [filtered, setFiltered] = useState([]);
  const category = cat
    ? categories.find((c) => c.id === cat)
    : subject
      ? subjects.find((d) => d.id === subject)
      : categories.find((c) => c.id === "special");

  useEffect(() => {
    if (filter !== search_filter) {
      setSearch_filter(filter);
    }
    const cat_key = cat ? "cat" : subject ? "subject" : "cat";
    const cat_id = cat ? cat : subject ? subject : "special";

    const all_products_list = Object.values({ ...products, oldProds: null });
    if (all_products_list.length !== 0) {
      const raw_prod_list = products.filter((prod) => {
        if (prod) {
          if (search_filter !== "" && !multi) {
            return (
              prod.name.toLowerCase().includes(search_filter.toLowerCase()) ||
              prod.desc.toLowerCase().includes(search_filter.toLowerCase) ||
              prod.subjects.includes(search_filter.toLowerCase())
            );
          } else {
            return prod[cat_key].includes(cat_id);
          }
        }
        return false;
      });

      const filtered_product_list = filterRandomResults(raw_prod_list, multi, pId, prodsort);
      setFiltered(filtered_product_list);
    }
  }, [cat, categories, subjects, subject, filter, multi, pId, products, prodsort, search_filter]);

  if (filtered && filtered.length) {
    return (
      <div className="shopSection">
        {multi ? (
          <ProdListHeader
            cat={cat}
            subject={subject}
            catobj={category}
          />
        ) : (
          ""
        )}
        {filtered.map((item, idx) => {
          return (
            <ProductBox
              key={idx}
              item={item}
            />
          );
        })}
        {multi ? (
          <MoreLink
            subject={subject}
            category={category}
          />
        ) : (
          ""
        )}
      </div>
    );
  } else if (search_filter !== "") {
    return <p style={{ fontSize: "1.5em" }}>No Results for search term: "{search_filter}"</p>;
  } else {
    return null;
  }
};

const MoreLink = ({ subject, category }: { subject: categoriesType; category: categoriesType }) => {
  let toUrl = "/giftshop/";
  if (category) {
    toUrl = "/giftshop/" + category.id;
  }
  if (subject && catobj) {
    category = catobj;
    toUrl = "/subjectpage/" + subject;
  }
  return (
    <p className="textright">
      <Link to={toUrl}>See More {category.name}</Link>
    </p>
  );
};

const ProdListHeader = ({ cat, subject, catobj }) => {
  let toUrl = "/giftshop/";
  var category = {};
  if (cat) {
    category = catobj;
    toUrl = "/giftshop/" + cat;
  }
  if (subject) {
    category = catobj;
    toUrl = "/subjectpage/" + subject;
  }

  return (
    <div className="shopHeader">
      <Link to={toUrl}>{category?.name}</Link>
    </div>
  );
};

export default ProdList;
