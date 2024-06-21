"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import "./payment.scss";
import CustomButton from "@/components/CustomButton/CustomButton";

const PaymentPage: React.FC = () => {
  const searchParams = useSearchParams();
  const total = searchParams.get("total");
  const router = useRouter();

  const handlePayment = () => {
    alert("Payment successful!");
    router.push("/");
  };

  return (
    <div className="payment-page">
      <h1 className="payment-page__title">Payment</h1>
      <p className="payment-page__total">Total Amount: € {total}</p>
      <CustomButton text="Pay Now" onClick={handlePayment} />
    </div>
  );
};

export default PaymentPage;
