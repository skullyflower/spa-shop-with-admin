import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProdList from "../../shared/shop/product-list";
import CategoryHeader from "../../shared/shop/category-header";
import ShopFilter from "../../shared/shop/product-filters";
import updateHead from "../../shared/updateHead";
import { categories } from "../../state/shopData";

const Shoppage = () => {
  const { category_id } = useParams() ?? "all";
  const category = categories.find((cat) => cat.id === category_id) ?? categories[0];
  const subCategories = category_id === "all" ? categories : [category_id];
  useEffect(() => {
    const page_title = `Shop ${category.name} `;
    const page_description = category.description;
    updateHead(page_title, page_description);
  }, [category]);

  if (category?.name) {
    return (
      <section
        id="content"
        className="shop">
        <ShopFilter />
        <CategoryHeader category={category} />
        {subCategories.map((cat, index) => {
          return (
            <ProdList
              key={index}
              cat={cat}
              multi={subCategories.length > 1}
            />
          );
        })}
      </section>
    );
  }
  return null;
};
export default Shoppage;
