import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsData from "./products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  const handleBuy = () => {
    navigate("/checkout", { state: { product } });
  };

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
            <p>Contact for more Info: 09445500066</p>
            <button
              onClick={handleBuy}
              className="mt-6 bg-blue-500 text-white p-3 rounded-md w-full sm:w-auto hover:bg-blue-700 transition duration-300"
            >
              Buy
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
