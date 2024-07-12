"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import {
  incrementItem,
  decrementItem,
  selectCart,
} from "@/store/slices/cartSlice";

import "./shopping-cart.scss";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartState = useSelector(selectCart);

  const handleIncrementItem = (id: string) => {
    dispatch(incrementItem({ id }));
  };

  const handleDecrementItem = (id: string) => {
    dispatch(decrementItem({ id }));
  };

  const handleProceedToDelivery = () => {
    router.push("/delivery-info");
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
                <div className="shopping-cart-item__img">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    layout="fixed"
                    objectFit="cover"
                  />
                </div>
                <h2 className="shopping-cart-item__details">{item.name}</h2>
              </div>
              <div className="price-and-controls">
                <div className="controls">
                  <button
                    className="cart-controls"
                    onClick={() => handleDecrementItem(item.id)}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button
                    className="cart-controls"
                    onClick={() => handleIncrementItem(item.id)}
                  >
                    +
                  </button>
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
      <CustomButton text="Process Order" onClick={handleProceedToDelivery} />
    </div>
  );
}
