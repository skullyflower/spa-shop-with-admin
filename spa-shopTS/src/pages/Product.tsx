import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../state/shopDataold";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((prod) => prod.id === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Weight: {product.weight} kg</p>
      <p>Handling: ${product.handling}</p>
    </div>
  );
};

export default Product;
