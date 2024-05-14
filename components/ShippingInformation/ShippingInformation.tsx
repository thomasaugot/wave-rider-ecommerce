import React from "react";
import woodenSignal from "../../public/assets/img/wooden-sign.png";
import leaf from "../../public/assets/img/leaf4.png";
import "./ShippingInformation.scss";
import Image from "next/image";

const shippingInfoItems = [
  {
    title: "Returns & Exchange",
    description: "50 days for exchanges/ 14 days for returns",
  },
  {
    title: "Ultra-Fast Delivery",
    description: "Receive your order within the next 48 business hours",
    className: "wooden-signal__reversed secondchild",
  },
  {
    title: "Free Shipping",
    description: "Orders over €60 to Spain, incl. Canarias & Baleares",
  },
];

export const ShippingInformation: React.FC = () => {
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
            <Image
              src={leaf}
              alt="tropical tree leaf"
              className={`tropical-leaf ${item.className}`}
            />
          </div>
        ))}
      </div>
      <div className="custom-shape-divider-bottom-1715701048">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </>
  );
};
