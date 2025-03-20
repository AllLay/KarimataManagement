import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [contactMethod, setContactMethod] = useState("email");

  const product = location.state?.product;

  if (!product) {
    return <div className="text-center text-red-500">Product not found!</div>;
  }

  const handlePurchase = async () => {
    try {
      const response = await fetch(
        "https://karimatamanagement-production.up.railway.app/checkout",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            productId: product.id,
            clientName,
            clientEmail: contactMethod !== "phone" ? clientEmail : "",
            clientPhone: contactMethod !== "email" ? clientPhone : "",
          }),
        }
      );

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
    <div className="p-4 flex justify-center items-center min-h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 w-full max-w-lg">
        <h2 className="text-lg sm:text-xl font-bold mb-2">Checkout</h2>
        <h3 className="text-sm sm:text-lg mb-3">Product: {product.name}</h3>
        <img
          src={product.image}
          alt={product.name}
          className="w-full sm:w-48 h-auto rounded-md mb-3"
        />
        <p className="text-sm sm:text-lg font-bold">
          {new Intl.NumberFormat().format(product.price)} MMK
        </p>
        <p className="text-xs sm:text-sm">{product.description}</p>

        <div className="mt-4 w-full">
          <label className="text-white text-sm sm:text-base">Your Name:</label>
          <input
            type="text"
            className="p-2 rounded-md w-full text-black"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-4 w-full">
          <label className="text-white text-sm sm:text-base">Preferred Contact Method:</label>
          <select
            className="p-2 rounded-md w-full text-black"
            value={contactMethod}
            onChange={(e) => setContactMethod(e.target.value)}
          >
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="both">Both Email & Phone</option>
          </select>
        </div>

        {contactMethod !== "phone" && (
          <div className="mt-4 w-full">
            <label className="text-white text-sm sm:text-base">Your Email:</label>
            <input
              type="email"
              className="p-2 rounded-md w-full text-black"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        )}

        {contactMethod !== "email" && (
          <div className="mt-4 w-full">
            <label className="text-white text-sm sm:text-base">Your Phone Number:</label>
            <input
              type="tel"
              className="p-2 rounded-md w-full text-black"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        )}

        <button
          className="mt-6 bg-blue-500 text-white p-3 rounded-md w-full sm:w-auto hover:bg-blue-700 transition duration-300"
          onClick={handlePurchase}
          disabled={
            !clientName ||
            (contactMethod !== "phone" && !clientEmail) ||
            (contactMethod !== "email" && !clientPhone)
          }
        >
          Confirm Purchase
        </button>
      </div>
    </div>
  );
};

export default CheckOut;
