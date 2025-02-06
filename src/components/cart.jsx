import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const removeFromCart = (productId) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const increaseQuantity = (productId) => {
    setCart(
      cart.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart(
      cart.map((product) =>
        product.id === productId && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div className="cart-page min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
          Your Cart
        </h1>
        <div className="cart-items space-y-6">
          {cart.length === 0 ? (
            <p className="text-center text-gray-600 py-8">Your cart is empty</p>
          ) : (
            cart.map((product) => (
              <div
                key={product.id}
                className="cart-item flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-xl p-4 transition-all duration-300 hover:shadow-md"
              >
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0"
                />
                <div className="cart-info flex-grow text-center sm:text-left sm:pl-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.title}
                  </h3>
                  <p className="text-indigo-600 font-bold">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="quantity-control flex items-center justify-center sm:justify-start space-x-3 mt-3">
                    <button
                      onClick={() => decreaseQuantity(product.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                    >
                      -
                    </button>
                    <span className="text-gray-800 font-medium">
                      {product.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(product.id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="mt-4 sm:mt-0 px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition-colors duration-300"
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-total mt-8 text-center">
            <p className="text-2xl font-bold text-gray-900">
              Total: ${totalAmount.toFixed(2)}
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
