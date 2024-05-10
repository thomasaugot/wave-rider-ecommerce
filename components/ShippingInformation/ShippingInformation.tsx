import React from "react";

import { GiReturnArrow } from "react-icons/gi";
import { FaTruck } from "react-icons/fa";
import { TbCurrencyEuroOff } from "react-icons/tb";
import bgSurfandPalms from "../../public/assets/img/bg-surferandpalms.webp";
import bgBirds from "../../public/assets/img/birds.webp";
import "./ShippingInformation.scss";
import Image from "next/image";

export default function ShippingInformation() {
  return (
    <div className="shipping-info-container">
      <Image
        src={bgSurfandPalms}
        alt="background image of a surfer and palm trees"
        className="shipping-info-bg-img-first"
      />
      <Image
        src={bgBirds}
        alt="background image of a surfer and palm trees"
        className="shipping-info-bg-img-sec"
      />
      <div className="shipping-info-container__item">
        <div>
          <GiReturnArrow />
          <h2>Returns and Exchanges</h2>
        </div>
        <div>
          <p>Up to 50 days for exchanges/14 days for returns</p>
        </div>
      </div>
      <div className="shipping-info-container__item">
        <div>
          <FaTruck />
          <h2>Ultra-Fast Delivery</h2>
        </div>
        <div>
          <p>Receive your order within the next 24/48 business hours</p>
        </div>
      </div>
      <div className="shipping-info-container__item">
        <div>
          <TbCurrencyEuroOff />
          <h2>Free Shipping</h2>
        </div>
        <div>
          <p>
            All orders over €60 to Spain, incl. Canarias and Balearic Islands
          </p>
        </div>
      </div>
    </div>
  );
}
