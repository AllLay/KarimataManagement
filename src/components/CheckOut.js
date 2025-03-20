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
    <div className="p-6 text-gray-600 flex justify-center">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center gap-6 w-[600px]">
        <h2 className="text-xl font-bold mb-2">Checkout</h2>
        <h3 className="text-lg mb-3">Product: {product.name}</h3>
        <img
          src={product.image}
          alt={product.name}
          className="w-48 h-auto rounded-md mb-3"
        />
        <p className="text-lg font-bold">
          {new Intl.NumberFormat().format(product.price)} MMK
        </p>
        <p className="mt-3">{product.description}</p>

        <div className="mt-4 w-full flex flex-col gap-3">
          <label className="text-white">Your Name:</label>
          <input
            type="text"
            className="p-2 rounded-md w-full"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>

        <div className="mt-4 w-full">
          <label className="text-white">Preferred Contact Method:</label>
          <select
            className="p-2 rounded-md w-full"
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
            <label className="text-white">Your Email:</label>
            <input
              type="email"
              className="p-2 rounded-md w-full"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
        )}

        {contactMethod !== "email" && (
          <div className="mt-4 w-full">
            <label className="text-white">Your Phone Number:</label>
            <input
              type="tel"
              className="p-2 rounded-md w-full"
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
        )}

        <button
          className="mt-6 bg-blue-500 text-white p-3 rounded-md"
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
