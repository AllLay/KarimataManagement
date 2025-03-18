import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientEmail, setClientEmail] = useState("");

  const product = location.state?.product;

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  const handlePurchase = async () => {
    try {
      const response = await fetch("https://karitamamanagement.up.railway.app/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, clientEmail: clientEmail }),
    });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/");
      } else {
        alert("Error: " + (data.message || "Purchase failed"));
      }
    } catch (error) {
      alert("Failed to connect to the server.");
    }
  };

  return (
    <div className="p-6 text-gray-600 flex justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 w-[600px]">
        <h2 className="text-xl font-bold mb-2">Checkout</h2>
        <h3 className="text-lg mb-3">Product: {product.name}</h3>
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-auto rounded-md mb-3"
        />
        <p className="text-lg font-bold">{new Intl.NumberFormat().format(product.price)} MMK</p>
        <p className="mt-3">{product.description}</p>

        <div className="mt-6">
          <label htmlFor="email" className="text-white">
            Your Email:
          </label>
          <input
            type="email"
            id="email"
            className="mt-2 ml-2 p-2 rounded-md"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        <button
          className="mt-6 bg-blue-500 text-white p-3 rounded-md"
          onClick={handlePurchase}
          disabled={!clientEmail}
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
