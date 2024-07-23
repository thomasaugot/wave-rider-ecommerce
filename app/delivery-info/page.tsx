"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/CustomButton/CustomButton";
import { updateCart, selectCart } from "@/store/slices/cartSlice";
import { useForm } from "react-hook-form";

import "./delivery-info.scss";

export default function DeliveryInfoPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const cartState = useSelector(selectCart);

  const onSubmit = async (formData: any) => {
    try {
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
    } catch (error) {
      console.error("Error updating cart data:", error);
    }
  };

  const totalAmount = cartState.totalAmount.toFixed(2);

  const goBack = () => {
    router.back();
  };

  const getErrorMessage = (error: any) => {
    if (!error) return null;
    if (typeof error === "string") return error;
    if ("message" in error) return error.message;
    return "Invalid input";
  };

  // watch for changes in deliveryOption to calculate total
  const deliveryOption = watch("deliveryOption", "standard");

  return (
    <div className="delivery-info-page">
      <div className="delivery-info-container">
        <h2 className="section-heading">Delivery Information</h2>
        <form className="delivery-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="full-name">Full Name</label>
            <input
              id="full-name"
              placeholder="Kelly Slater"
              type="text"
              {...register("fullName", { required: "Full name is required" })}
            />
            {errors.fullName && (
              <p className="error-message">
                {getErrorMessage(errors.fullName)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="address-line1">Address Line 1</label>
            <input
              id="address-line1"
              placeholder="123 Surfboard Ave."
              type="text"
              {...register("addressLine1", {
                required: "Address Line 1 is required",
              })}
            />
            {errors.addressLine1 && (
              <p className="error-message">
                {getErrorMessage(errors.addressLine1)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="address-line2">Address Line 2</label>
            <input
              id="address-line2"
              placeholder="Apt 10"
              type="text"
              {...register("addressLine2")}
            />
            {errors.addressLine2 && (
              <p className="error-message">
                {getErrorMessage(errors.addressLine2)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              id="city"
              placeholder="Wavesville"
              type="text"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && (
              <p className="error-message">{getErrorMessage(errors.city)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              id="state"
              placeholder="Ocean State"
              type="text"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && (
              <p className="error-message">{getErrorMessage(errors.state)}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              id="postal-code"
              placeholder="12345"
              type="text"
              {...register("postalCode", {
                required: "Postal Code is required",
              })}
            />
            {errors.postalCode && (
              <p className="error-message">
                {getErrorMessage(errors.postalCode)}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="delivery-option">Delivery Option</label>
            <select
              id="delivery-option"
              {...register("deliveryOption")}
              defaultValue="standard"
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
              {deliveryOption === "standard"
                ? "5.00"
                : deliveryOption === "express"
                ? "15.00"
                : "25.00"}
            </p>
            <p>
              Total: €{" "}
              {(
                parseFloat(totalAmount) +
                (deliveryOption === "standard"
                  ? 5.0
                  : deliveryOption === "express"
                  ? 15.0
                  : 25.0)
              ).toFixed(2)}
            </p>
          </div>
          <div className="actions-container">
            <CustomButton
              text={"Back"}
              type="button"
              disabled={isSubmitting}
              onClick={goBack}
              secondary={true}
            />
            <CustomButton
              text={isSubmitting ? "Processing..." : "Proceed to Payment"}
              type="submit"
              disabled={isSubmitting}
              onClick={undefined}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
