import React from "react";
import { categoryType } from "@/state/shopData";
import useSiteStore from "@/state/zustand";

interface ProductListProps {
  cat: categoryType | undefined;
  multi?: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ cat, multi }) => {
  const allProducts = useSiteStore((state) => state.products);

  const products = cat
    ? allProducts.filter((product) => product.cats.includes(cat.id))
    : allProducts;
  return (
    <div className="product-list">
      {products.map((product) => (
        <div
          key={product.id}
          className="product-item">
          <h2>{product.name}</h2>
          <p>{product.desc}</p>
          <p>{product.desc_long}</p>
          <p>Price: ${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
