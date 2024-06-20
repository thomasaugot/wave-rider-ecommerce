"use client";

import React from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import "./shopping-cart.scss";

const CartPage: React.FC = () => {
  const { cartState, dispatch } = useCart();

  const handleRemoveFromCart = (id: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { id, name: "", price: 0, quantity: 1, image: "" },
    });
  };

  return (
    <div className="shopping-cart">
      <h1>Your Cart</h1>
      {cartState.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartState.items.map((item) => (
            <li key={item.id}>
              <Image src={item.image} alt={item.name} width={50} height={50} />
              <div>
                <h2>{item.name}</h2>
                <p>€ {item.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
              </div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <h2>Total: € {cartState.totalAmount.toFixed(2)}</h2>
    </div>
  );
};

export default CartPage;
