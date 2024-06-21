"use client";

import React from "react";
import "./payment.scss";
import { useCart } from "@/context/cartContext";
import CustomButton from "@/components/CustomButton/CustomButton";

const PaymentPage: React.FC = () => {
  const { cartState } = useCart();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Payment form submitted");
  };

  const totalAmount = cartState.totalAmount.toFixed(2);

  return (
    <div className="payment-page">
      <div className="checkout-container">
        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="billing-info">
            <h3 className="section-heading">Billing Information</h3>
            <div className="form-group">
              <label htmlFor="full-name">Full Name</label>
              <input
                id="full-name"
                name="full-name"
                placeholder="Kelly Slater"
                required
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address-line1">Address Line 1</label>
              <input
                id="address-line1"
                name="address-line1"
                placeholder="123 Surfboard Ave."
                required
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address-line2">Address Line 2</label>
              <input
                id="address-line2"
                name="address-line2"
                placeholder="Apt 10"
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                placeholder="Wavesville"
                required
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                id="state"
                name="state"
                placeholder="Ocean State"
                required
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="postal-code">Postal Code</label>
              <input
                id="postal-code"
                name="postal-code"
                placeholder="12345"
                required
                type="text"
              />
            </div>
          </div>

          <div className="payment-info">
            <h3 className="section-heading">Payment Information</h3>
            <div className="form-group">
              <label htmlFor="credit-card-num">Card Number</label>
              <input
                id="credit-card-num"
                name="credit-card-num"
                placeholder="1111-2222-3333-4444"
                required
                type="text"
                className="card-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration-month">Expiration Month</label>
              <input
                id="expiration-month"
                name="expiration-month"
                placeholder="MM"
                required
                type="text"
                className="card-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="expiration-year">Expiration Year</label>
              <input
                id="expiration-year"
                name="expiration-year"
                placeholder="YYYY"
                required
                type="text"
                className="card-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                name="cvv"
                placeholder="123"
                required
                type="text"
                className="card-input"
              />
            </div>
            <p>Pay now: {totalAmount} </p>
          </div>
          <CustomButton
            text="Validate Payment"
            type="submit"
            onClick={undefined}
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;