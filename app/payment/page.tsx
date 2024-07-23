"use client";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";
import VisaLogo from "../../public/assets/img/visa.webp";
import MasterCardLogo from "../../public/assets/img/mastercard.webp";
import AmexLogo from "../../public/assets/img/amex.webp";
import getStripe from "@/services/clientStripe";
import { selectCart } from "@/store/slices/cartSlice";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  RegisterOptions,
} from "react-hook-form";

import "./payment.scss";

interface DeliveryInfo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryOption: string;
}

interface BillingInfo {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
}

interface PaymentInfo {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
}

interface FormValues extends FieldValues {
  deliveryInfo: DeliveryInfo;
  billingInfo: BillingInfo;
  paymentInfo: PaymentInfo;
}

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartState = useSelector(selectCart);

  const [loading, setLoading] = useState(false);
  const [useSameAddress, setUseSameAddress] = useState(false);

  const {
    handleSubmit,
    setValue,
    register,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      deliveryInfo: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        deliveryOption: "standard",
      },
      billingInfo: {
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
      },
      paymentInfo: {
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      },
    },
  });

  useEffect(() => {
    if (searchParams) {
      const deliveryInfo = {
        fullName: searchParams.get("fullName") || "",
        addressLine1: searchParams.get("addressLine1") || "",
        addressLine2: searchParams.get("addressLine2") || "",
        city: searchParams.get("city") || "",
        state: searchParams.get("state") || "",
        postalCode: searchParams.get("postalCode") || "",
        deliveryOption: searchParams.get("deliveryOption") || "standard",
      };

      setValue("deliveryInfo", deliveryInfo);

      if (useSameAddress) {
        setValue("billingInfo", deliveryInfo);
      }
    }
  }, [searchParams, setValue, useSameAddress]);

  const handleCheckout: SubmitHandler<FormValues> = async (formData) => {
    setLoading(true);

    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartState.items,
        deliveryInfo: formData.deliveryInfo,
        billingInfo: useSameAddress
          ? formData.deliveryInfo
          : formData.billingInfo,
      }),
    });

    const data = await response.json();

    if (data.sessionId) {
      stripe?.redirectToCheckout({ sessionId: data.sessionId });
    } else {
      console.error("Failed to create Stripe session.");
      setLoading(false);
    }
  };

  const deliveryOption = watch("deliveryInfo.deliveryOption", "standard");
  const deliveryCost =
    deliveryOption === "standard"
      ? 5.0
      : deliveryOption === "express"
      ? 15.0
      : 25.0;

  const totalAmount = cartState.totalAmount.toFixed(2);
  const totalWithDelivery = (parseFloat(totalAmount) + deliveryCost).toFixed(2);

  const goBack = () => {
    router.back();
  };

  const deliveryInfo = watch("deliveryInfo");

  return (
    <div className="payment-page">
      <div className="checkout-container">
        <h2 className="section-heading">Payment Information</h2>
        <form className="payment-form" onSubmit={handleSubmit(handleCheckout)}>
          <div className="right-col">
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <div className="info-group">
                <p>
                  <strong>Full Name:</strong> {deliveryInfo.fullName}
                </p>
                <p>
                  <strong>Address Line 1:</strong> {deliveryInfo.addressLine1}
                </p>
                {deliveryInfo.addressLine2 && (
                  <p>
                    <strong>Address Line 2:</strong> {deliveryInfo.addressLine2}
                  </p>
                )}
                <p>
                  <strong>City:</strong> {deliveryInfo.city}
                </p>
                <p>
                  <strong>State:</strong> {deliveryInfo.state}
                </p>
                <p>
                  <strong>Postal Code:</strong> {deliveryInfo.postalCode}
                </p>
                <p>
                  <strong>Delivery Option:</strong>{" "}
                  {deliveryInfo.deliveryOption}
                </p>
              </div>
            </div>
            <div className="billing-info">
              <h3>Billing Information</h3>
              <label>
                <input
                  type="checkbox"
                  checked={useSameAddress}
                  onChange={() => setUseSameAddress(!useSameAddress)}
                />
                <span>Use same address for billing</span>
              </label>
              {!useSameAddress && (
                <div className="billing-form">
                  <div className="form-group">
                    <label htmlFor="billing-fullName">Full Name</label>
                    <input
                      type="text"
                      id="billing-fullName"
                      {...register("billingInfo.fullName", {
                        required: "Full name is required",
                      })}
                      placeholder="Full Name"
                    />
                    {errors.billingInfo?.fullName && (
                      <p className="error-message">
                        {errors.billingInfo.fullName.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-addressLine1">Address Line 1</label>
                    <input
                      type="text"
                      id="billing-addressLine1"
                      {...register("billingInfo.addressLine1", {
                        required: "Address Line 1 is required",
                      })}
                      placeholder="Address Line 1"
                    />
                    {errors.billingInfo?.addressLine1 && (
                      <p className="error-message">
                        {errors.billingInfo.addressLine1.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-addressLine2">Address Line 2</label>
                    <input
                      type="text"
                      id="billing-addressLine2"
                      {...register("billingInfo.addressLine2")}
                      placeholder="Address Line 2"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-city">City</label>
                    <input
                      type="text"
                      id="billing-city"
                      {...register("billingInfo.city", {
                        required: "City is required",
                      })}
                      placeholder="City"
                    />
                    {errors.billingInfo?.city && (
                      <p className="error-message">
                        {errors.billingInfo.city.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-state">State</label>
                    <input
                      type="text"
                      id="billing-state"
                      {...register("billingInfo.state", {
                        required: "State is required",
                      })}
                      placeholder="State"
                    />
                    {errors.billingInfo?.state && (
                      <p className="error-message">
                        {errors.billingInfo.state.message}
                      </p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="billing-postalCode"
                      {...register("billingInfo.postalCode", {
                        required: "Postal Code is required",
                      })}
                      placeholder="Postal Code"
                    />
                    {errors.billingInfo?.postalCode && (
                      <p className="error-message">
                        {errors.billingInfo.postalCode.message}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="left-col">
            <div className="order-summary">
              <h3>Order Summary</h3>
              <p>
                <strong>Items Total:</strong> € {totalAmount}
              </p>
              <p>
                <strong>Delivery:</strong> € {deliveryCost.toFixed(2)}
              </p>
              <p>
                <strong>Total Amount:</strong> € {totalWithDelivery}
              </p>
            </div>
            <div className="credit-card-section">
              <h3>Credit Card Information</h3>
              <div className="credit-card-logos">
                <Image src={VisaLogo} alt="Visa" width={60} height={40} />
                <Image
                  src={MasterCardLogo}
                  alt="MasterCard"
                  width={60}
                  height={40}
                />
                <Image
                  src={AmexLogo}
                  alt="American Express"
                  width={60}
                  height={40}
                />
              </div>
              <div className="credit-card-inputs">
                <div className="form-group">
                  <label htmlFor="cardNumber">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    {...register("paymentInfo.cardNumber", {
                      required: "Card Number is required",
                    })}
                    placeholder="Card Number"
                  />
                  {errors.paymentInfo?.cardNumber && (
                    <p className="error-message">
                      {errors.paymentInfo.cardNumber.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    {...register("paymentInfo.expiryDate", {
                      required: "Expiry Date is required",
                    })}
                    placeholder="MM/YY"
                  />
                  {errors.paymentInfo?.expiryDate && (
                    <p className="error-message">
                      {errors.paymentInfo.expiryDate.message}
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    {...register("paymentInfo.cvc", {
                      required: "CVC is required",
                    })}
                    placeholder="CVC"
                  />
                  {errors.paymentInfo?.cvc && (
                    <p className="error-message">
                      {errors.paymentInfo.cvc.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="actions-container">
          <CustomButton
            text={"Back"}
            type="button"
            disabled={isSubmitting}
            onClick={goBack}
            secondary={true}
          />
          <CustomButton
            text={loading ? "Processing..." : "Pay Now"}
            type="submit"
            disabled={loading || isSubmitting}
            onClick={() => handleSubmit(handleCheckout)()}
          />
        </div>
      </div>
    </div>
  );
}
