"use client";

import React, { FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { updateCart, selectCart } from "@/store/slices/cartSlice";

import "./delivery-info.scss";

export default function DeliveryInfoPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    deliveryOption: "standard",
  });

  const cartState = useSelector(selectCart);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const updatedCart = {
      ...cartState,
      deliveryOption: formData.deliveryOption,
      deliveryAddress: {
        fullName: formData.fullName,
        addressLine1: formData.addressLine1,
        addressLine2: formData.addressLine2,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
    };

    dispatch(updateCart(updatedCart));

    const queryString = new URLSearchParams(formData).toString();
    router.push(`/payment?${queryString}`);

    setLoading(false);
  };

  const totalAmount = cartState.totalAmount.toFixed(2);

  const goBack = () => {
    router.back();
  };

  return (
    <div className="delivery-info-page">
      <div className="delivery-info-container">
        <h2 className="section-heading">Delivery Information</h2>
        <form className="delivery-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              name="fullName"
              placeholder="Kelly Slater"
              required
              type="text"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address-line1">Address Line 1</label>
            <input
              id="address-line1"
              name="addressLine1"
              placeholder="123 Surfboard Ave."
              required
              type="text"
              value={formData.addressLine1}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address-line2">Address Line 2</label>
            <input
              id="address-line2"
              name="addressLine2"
              placeholder="Apt 10"
              type="text"
              value={formData.addressLine2}
              onChange={handleChange}
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
              value={formData.city}
              onChange={handleChange}
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
              value={formData.state}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              id="postal-code"
              name="postalCode"
              placeholder="12345"
              required
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="delivery-option">Delivery Option</label>
            <select
              id="delivery-option"
              name="deliveryOption"
              value={formData.deliveryOption}
              onChange={handleChange}
            >
              <option value="standard">Standard Delivery - €5.00</option>
              <option value="express">Express Delivery - €15.00</option>
              <option value="nextDay">Next Day Delivery - €25.00</option>
            </select>
          </div>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <p>Items Total: € {totalAmount}</p>
            <p>
              Delivery: €{" "}
              {formData.deliveryOption === "standard"
                ? "5.00"
                : formData.deliveryOption === "express"
                ? "15.00"
                : "25.00"}
            </p>
            <p>
              Total: €{" "}
              {(
                parseFloat(totalAmount) +
                (formData.deliveryOption === "standard"
                  ? 5.0
                  : formData.deliveryOption === "express"
                  ? 15.0
                  : 25.0)
              ).toFixed(2)}
            </p>
          </div>
          <div className="actions-container">
            <CustomButton
              text={loading ? "Processing..." : "Proceed to Payment"}
              type="submit"
              disabled={loading}
              onClick={undefined}
            />
            <CustomButton
              text={"Back"}
              type="submit"
              disabled={loading}
              onClick={goBack}
              secondary={true}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
