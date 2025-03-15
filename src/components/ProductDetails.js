import React from "react";
import { useParams } from "react-router-dom";
import productsData from "./products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const product = productsData.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  return (
    <div className="p-6 text-gray-600 flex justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center gap-6 w-[600px]">
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-auto rounded-md"
        />
        <div>
          <h2 className="text-xl font-bold mb-2">{product.name}</h2>
          <h3 className="mb-2">By {product.company}</h3>
          <p className="text-lg font-bold">{new Intl.NumberFormat().format(product.price)} MMK</p>
          <p className="mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;