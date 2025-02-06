import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import CartPage from "./components/cart";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartProvider>
  );
};

export default App;
