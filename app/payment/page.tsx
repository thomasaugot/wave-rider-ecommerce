"use client";

import React, { FormEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";
import VisaLogo from "../../public/assets/img/visa.webp";
import MasterCardLogo from "../../public/assets/img/mastercard.webp";
import AmexLogo from "../../public/assets/img/amex.webp";
import getStripe from "@/services/clientStripe";
import { updateCart, selectCart } from "@/store/slices/cartSlice";
import "./payment.scss";

const PaymentPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const cartState = useSelector(selectCart);

  const [loading, setLoading] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    deliveryOption: "standard",
  });

  const [useSameAddress, setUseSameAddress] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
  });

  useEffect(() => {
    if (searchParams) {
      setDeliveryInfo({
        fullName: searchParams.get("fullName") || "",
        addressLine1: searchParams.get("addressLine1") || "",
        addressLine2: searchParams.get("addressLine2") || "",
        city: searchParams.get("city") || "",
        state: searchParams.get("state") || "",
        postalCode: searchParams.get("postalCode") || "",
        deliveryOption: searchParams.get("deliveryOption") || "standard",
      });

      setBillingInfo({
        fullName: searchParams.get("fullName") || "",
        addressLine1: searchParams.get("addressLine1") || "",
        addressLine2: searchParams.get("addressLine2") || "",
        city: searchParams.get("city") || "",
        state: searchParams.get("state") || "",
        postalCode: searchParams.get("postalCode") || "",
      });
    }
  }, [searchParams]);

  const handleCheckout = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartState.items,
        deliveryInfo,
        billingInfo: useSameAddress ? deliveryInfo : billingInfo,
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

  const totalAmount = cartState.totalAmount.toFixed(2);
  const deliveryCost =
    deliveryInfo.deliveryOption === "standard"
      ? 5.0
      : deliveryInfo.deliveryOption === "express"
      ? 15.0
      : 25.0;
  const totalWithDelivery = (parseFloat(totalAmount) + deliveryCost).toFixed(2);

  const handleBillingInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const goBack = () => {
    router.back();
  };

  return (
    <div className="payment-page">
      <div className="checkout-container">
        <h2 className="section-heading">Payment Information</h2>
        <form className="payment-form" onSubmit={handleCheckout}>
          <div className="right-col">
            <div className="delivery-info">
              <h3>Delivery Information</h3>
              <p>
                <strong>Name:</strong> {deliveryInfo.fullName}
              </p>
              <p>
                <strong>Address:</strong> {deliveryInfo.addressLine1},{" "}
                {deliveryInfo.addressLine2 && `${deliveryInfo.addressLine2}, `}
                {deliveryInfo.city}, {deliveryInfo.state},{" "}
                {deliveryInfo.postalCode}
              </p>
              <p>
                <strong>Delivery Option:</strong>{" "}
                {deliveryInfo.deliveryOption.charAt(0).toUpperCase() +
                  deliveryInfo.deliveryOption.slice(1)}
              </p>
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
                      name="fullName"
                      placeholder="Full Name"
                      value={billingInfo.fullName}
                      onChange={handleBillingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-addressLine1">Address Line 1</label>
                    <input
                      type="text"
                      id="billing-addressLine1"
                      name="addressLine1"
                      placeholder="Address Line 1"
                      value={billingInfo.addressLine1}
                      onChange={handleBillingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-addressLine2">Address Line 2</label>
                    <input
                      type="text"
                      id="billing-addressLine2"
                      name="addressLine2"
                      placeholder="Address Line 2"
                      value={billingInfo.addressLine2}
                      onChange={handleBillingInfoChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-city">City</label>
                    <input
                      type="text"
                      id="billing-city"
                      name="city"
                      placeholder="City"
                      value={billingInfo.city}
                      onChange={handleBillingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-state">State</label>
                    <input
                      type="text"
                      id="billing-state"
                      name="state"
                      placeholder="State"
                      value={billingInfo.state}
                      onChange={handleBillingInfoChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="billing-postalCode">Postal Code</label>
                    <input
                      type="text"
                      id="billing-postalCode"
                      name="postalCode"
                      placeholder="Postal Code"
                      value={billingInfo.postalCode}
                      onChange={handleBillingInfoChange}
                      required
                    />
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
                <strong>Total:</strong> € {totalWithDelivery}
              </p>
            </div>
            <div className="payment-method">
              <h3>Choose Payment Method</h3>
              <div className="payment-method__logos">
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
                    name="cardNumber"
                    placeholder="Card Number"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="expiryDate">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cvc">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    name="cvc"
                    placeholder="CVC"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
        <div className="actions-container">
          <CustomButton
            text={loading ? "Processing..." : "Pay Now"}
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
      </div>
    </div>
  );
};

export default PaymentPage;
