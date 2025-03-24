import React, { useState } from "react";
import { Link } from "react-router-dom";
import productsData from "./products.json";

const ProductList = () => {
  const [products] = useState(productsData);
  
  return (
    <div className="bg-black text-gray-100 p-4 flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 w-full text-center">
        {products.map((product) => (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="bg-[#2A2A2A] p-3 rounded-lg shadow-lg transform transition-transform duration-200 hover:scale-105 flex flex-col justify-between w-full max-w-xs mx-auto"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-md mb-3"
            />
            <h3 className="text-sm sm:text-md md:text-lg font-semibold mb-1">
              {product.name}
            </h3>
            <h4 className="text-xs sm:text-sm md:text-base">By {product.company}</h4>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
