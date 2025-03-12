import React from "react";
import { useParams } from "react-router-dom";
import useSiteStore from "@/state/zustand";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const products = useSiteStore((state) => state.products);
  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.desc}</p>
      <p>Price: ${product.price}</p>
      <p>Weight: {product.weight} kg</p>
      <p>Handling: ${product.handling}</p>
    </div>
  );
};

export default Product;
