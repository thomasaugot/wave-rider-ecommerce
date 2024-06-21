"use client";

import React from "react";
import { useCart } from "@/context/cartContext";
import Image from "next/image";
import "./shopping-cart.scss";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useRouter } from "next/navigation";

const CartPage: React.FC = () => {
  const { cartState, dispatch } = useCart();
  const router = useRouter();

  const handleIncrementItem = (id: string) => {
    dispatch({
      type: "INCREMENT_ITEM",
      payload: { id },
    });
  };

  const handleDecrementItem = (id: string) => {
    dispatch({
      type: "DECREMENT_ITEM",
      payload: { id },
    });
  };

  const handleProceedToPayment = () => {
    const total = cartState.totalAmount.toFixed(2);
    router.push(`/payment?total=${total}`);
  };

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart__title">Your Cart</h1>
      {cartState.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="shopping-cart__items">
          {cartState.items.map((item) => (
            <li key={item.id} className="shopping-cart-item">
              <div className="shopping-cart-item__info">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="shopping-cart-item__img"
                />
                <h2 className="shopping-cart-item__details">{item.name}</h2>
              </div>
              <div className="price-and-controls">
                <div className="controls">
                  <CustomButton
                    onClick={() => handleDecrementItem(item.id)}
                    text={"-"}
                    secondary={true}
                  />
                  <span className="quantity">{item.quantity}</span>
                  <CustomButton
                    onClick={() => handleIncrementItem(item.id)}
                    text={"+"}
                    secondary={true}
                  />
                </div>
                <p className="price">
                  € {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
      <h2 className="total-price">
        <span>Total:</span> € {cartState.totalAmount.toFixed(2)}
      </h2>
      <CustomButton
        text="Proceed to Payment"
        onClick={handleProceedToPayment}
      />
    </div>
  );
};

export default CartPage;
