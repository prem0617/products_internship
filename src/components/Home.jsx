"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useCart } from "../context/CartContext";

function Home() {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); //Fixed useEffect dependency

  const addToCart = (product) => {
    const productExists = cart.some((item) => item.id === product.id);
    if (productExists) {
      toast.error("Product already in cart!");
      return;
    }
    setCart([...cart, { ...product, quantity: 1 }]);
    toast.success("Product added to cart!");
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="product-list container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 p-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white p-6 rounded-2xl shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="relative overflow-hidden rounded-xl mb-4 group">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.title}
                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-3 bg-white text-gray-800 font-semibold rounded-md transition-all transform hover:bg-gray-100 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-xl font-semibold text-gray-800 text-center mb-2 line-clamp-2 h-14">
                {product.title}
              </h3>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-sm text-yellow-500">
                  {"★".repeat(Math.round(product.rating.rate))}
                </span>
                <span className="text-sm text-gray-600">
                  ({product.rating.count} reviews)
                </span>
              </div>
              <p className="text-sm text-gray-600 text-center mb-2 line-clamp-3 h-18">
                {product.description}
              </p>
              <p className="text-lg font-bold text-indigo-600 mb-4">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
