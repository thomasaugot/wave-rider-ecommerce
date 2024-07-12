"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import woodenSignal from "../../public/assets/img/mobile-wooden-signal.webp";

import "./ShippingInformation.scss";

const shippingInfoItems = [
  {
    title: "Returns & Exchange",
    description: "Up to 50 days for exchanges / 14 days for returns",
  },
  {
    title: "Ultra-Fast Delivery",
    description: "Receive your order within the next 48 business hours",
    className: "wooden-signal__secondchild",
  },
  {
    title: "Free Shipping",
    description: "Orders over €60 to Spain, incl. Canarias & Baleares",
  },
];

export const ShippingInformation: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Call once to set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="shipping-info">
        {shippingInfoItems.map((item, index) => (
          <div className="shipping-info__item" key={index}>
            <Image
              src={woodenSignal}
              alt="wooden signal"
              className={`wooden-signal ${item.className}`}
            />
            <div className={`shipping-info__item__content ${item.className}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
