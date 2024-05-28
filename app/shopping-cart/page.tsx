"use client";

import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import "./shopping-cart.scss";
import CustomButton from "@/components/CustomButton/CustomButton";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: "Product 1",
    price: 29.99,
    quantity: 2,
    image: "https://via.placeholder.com/100",
  },
  {
    id: 2,
    name: "Product 2",
    price: 49.99,
    quantity: 1,
    image: "https://via.placeholder.com/100",
  },
];

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const handleAdd = (id: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleRemove = (id: number) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.quantity > 0
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleDelete = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart__title">Your Cart</h1>
      <ul className="shopping-cart__items">
        {cartItems.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.name}
              className="cart-item__image"
            />
            <div className="cart-item__details">
              <h2 className="cart-item__name">{item.name}</h2>
              <p className="cart-item__price">€ {item.price.toFixed(2)}</p>
              <p className="cart-item__quantity">Quantity: {item.quantity}</p>
              <div className="cart-item__controls">
                <button
                  className="control-button"
                  onClick={() => handleAdd(item.id)}
                >
                  <FaPlusCircle />
                </button>
                <button
                  className="control-button"
                  onClick={() => handleRemove(item.id)}
                >
                  <FaMinusCircle />
                </button>
                <button
                  className="control-button"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-total">
        <h2>Total: ${total.toFixed(2)}</h2>
        <CustomButton text={"Proceed to Checkout"} onClick={() => {}} />
      </div>
    </div>
  );
}
