import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductList from "@/components/ProductList";
import CategoryHeader from "@/components/shop/ShopcatHeader";
import ShopFilter from "@/components/shop/ShopFilter";
import updateHead from "@/utilities/UpdateHead";
import useSiteStore from "@/state/zustand";

const Shoppage = () => {
  const { category_id } = useParams();
  const categories = useSiteStore((state) => state.categories);
  const category = categories.find((cat) => cat.id === category_id) ?? categories[0];

  useEffect(() => {
    const page_title = `Shop ${category?.name} `;
    const page_description = category?.description;
    updateHead(page_title, page_description);
  }, [category]);

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

  return (
    <section
      id="content"
      className="shop">
      <ShopFilter />
      <CategoryHeader category={category} />
      {subCategories.map((cat, index) => {
        return (
          <ProductList
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
