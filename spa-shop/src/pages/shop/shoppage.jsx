import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProdList from "../../shared/shop/product-list";
import CategoryHeader from "../../shared/shop/category-header";
import ShopFilter from "../../shared/shop/product-filters";
import updateHead from "../../shared/updateHead";
import { categories } from "../../state/shopData";

const Shoppage = () => {
  const { category_id } = useParams();
  const category = categories.find((cat) => cat.id === category_id) ?? categories[0];
  if (!category) {
    return (
      <section
        id="content"
        className="shop">
        <h1>Shop Coming Soon!</h1>
      </section>
    );
  }
  const subCategories = category_id !== undefined ? categories : [category_id];
  useEffect(() => {
    const page_title = `Shop ${category.name} `;
    const page_description = category.description;
    updateHead(page_title, page_description);
  }, [category]);

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
};
export default Shoppage;
