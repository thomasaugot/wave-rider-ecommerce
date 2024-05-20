"use client";

import React, { useEffect, useState } from "react";
import woodenSignal from "../../public/assets/img/wooden-sign.webp";
import mobileWoodenSignal from "../../public/assets/img/mobile-wooden-signal.webp";
import beachBg from "../../public/assets/img/beach-bg.webp";
import "./ShippingInformation.scss";
import Image from "next/image";

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
        <div className="background"></div>
        <Image src={beachBg} alt="Texture" className="texture" />
        {shippingInfoItems.map((item, index) => (
          <div className="shipping-info__item" key={index}>
            {isMobile ? (
              <Image
                src={mobileWoodenSignal}
                alt="wooden signal"
                className={`wooden-signal ${item.className}`}
              />
            ) : (
              <Image
                src={woodenSignal}
                alt="wooden signal"
                className={`wooden-signal ${item.className}`}
              />
            )}
            <div className={`shipping-info__item__content ${item.className}`}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <svg
        id="wave"
        viewBox="0 0 1440 150"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0">
            <stop
              stop-color="rgba(237.141, 151.43, 8.996, 1)"
              offset="0%"
            ></stop>
            <stop stop-color="rgba(255, 189, 89, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          className="path1"
          fill="url(#sw-gradient-0)"
          d="M0,15L48,32.5C96,50,192,85,288,102.5C384,120,480,120,576,117.5C672,115,768,110,864,97.5C960,85,1056,65,1152,50C1248,35,1344,25,1440,40C1536,55,1632,95,1728,92.5C1824,90,1920,45,2016,30C2112,15,2208,30,2304,35C2400,40,2496,35,2592,47.5C2688,60,2784,90,2880,105C2976,120,3072,120,3168,117.5C3264,115,3360,110,3456,102.5C3552,95,3648,85,3744,80C3840,75,3936,75,4032,65C4128,55,4224,35,4320,45C4416,55,4512,95,4608,107.5C4704,120,4800,105,4896,100C4992,95,5088,100,5184,100C5280,100,5376,95,5472,97.5C5568,100,5664,110,5760,107.5C5856,105,5952,90,6048,80C6144,70,6240,65,6336,62.5C6432,60,6528,60,6624,70C6720,80,6816,100,6864,110L6912,120L6912,150L6864,150C6816,150,6720,150,6624,150C6528,150,6432,150,6336,150C6240,150,6144,150,6048,150C5952,150,5856,150,5760,150C5664,150,5568,150,5472,150C5376,150,5280,150,5184,150C5088,150,4992,150,4896,150C4800,150,4704,150,4608,150C4512,150,4416,150,4320,150C4224,150,4128,150,4032,150C3936,150,3840,150,3744,150C3648,150,3552,150,3456,150C3360,150,3264,150,3168,150C3072,150,2976,150,2880,150C2784,150,2688,150,2592,150C2496,150,2400,150,2304,150C2208,150,2112,150,2016,150C1920,150,1824,150,1728,150C1632,150,1536,150,1440,150C1344,150,1248,150,1152,150C1056,150,960,150,864,150C768,150,672,150,576,150C480,150,384,150,288,150C192,150,96,150,48,150L0,150Z"
        ></path>
        <defs>
          <linearGradient id="sw-gradient-1" x1="0" x2="0" y1="1" y2="0">
            <stop
              stop-color="rgba(253.079, 226.029, 181.079, 1)"
              offset="0%"
            ></stop>
            <stop stop-color="rgba(255, 179, 11, 1)" offset="100%"></stop>
          </linearGradient>
        </defs>
        <path
          className="path2"
          fill="url(#sw-gradient-1)"
          d="M0,15L48,27.5C96,40,192,65,288,62.5C384,60,480,30,576,32.5C672,35,768,70,864,85C960,100,1056,95,1152,77.5C1248,60,1344,30,1440,35C1536,40,1632,80,1728,100C1824,120,1920,120,2016,110C2112,100,2208,80,2304,65C2400,50,2496,40,2592,37.5C2688,35,2784,40,2880,40C2976,40,3072,35,3168,47.5C3264,60,3360,90,3456,107.5C3552,125,3648,130,3744,120C3840,110,3936,85,4032,82.5C4128,80,4224,100,4320,107.5C4416,115,4512,110,4608,97.5C4704,85,4800,65,4896,60C4992,55,5088,65,5184,80C5280,95,5376,115,5472,125C5568,135,5664,135,5760,117.5C5856,100,5952,65,6048,55C6144,45,6240,60,6336,62.5C6432,65,6528,55,6624,52.5C6720,50,6816,55,6864,57.5L6912,60L6912,150L6864,150C6816,150,6720,150,6624,150C6528,150,6432,150,6336,150C6240,150,6144,150,6048,150C5952,150,5856,150,5760,150C5664,150,5568,150,5472,150C5376,150,5280,150,5184,150C5088,150,4992,150,4896,150C4800,150,4704,150,4608,150C4512,150,4416,150,4320,150C4224,150,4128,150,4032,150C3936,150,3840,150,3744,150C3648,150,3552,150,3456,150C3360,150,3264,150,3168,150C3072,150,2976,150,2880,150C2784,150,2688,150,2592,150C2496,150,2400,150,2304,150C2208,150,2112,150,2016,150C1920,150,1824,150,1728,150C1632,150,1536,150,1440,150C1344,150,1248,150,1152,150C1056,150,960,150,864,150C768,150,672,150,576,150C480,150,384,150,288,150C192,150,96,150,48,150L0,150Z"
        ></path>
      </svg>
    </>
  );
};
