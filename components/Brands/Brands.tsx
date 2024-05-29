import "./Brands.scss";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";

import aipa from "@/public/assets/img/brand-logos/aipa.webp";
import dakine from "@/public/assets/img/brand-logos/dakine.webp";
import funkshen from "@/public/assets/img/brand-logos/funkshen.webp";
import gopro from "@/public/assets/img/brand-logos/gopro.webp";
import jaked from "@/public/assets/img/brand-logos/jaked.webp";
import loftsails from "@/public/assets/img/brand-logos/loftsails.webp";
import mystic from "@/public/assets/img/brand-logos/mystic.webp";
import nomads from "@/public/assets/img/brand-logos/nomads.webp";
import oceanStorm from "@/public/assets/img/brand-logos/ocean-storm.webp";
import peterLynn from "@/public/assets/img/brand-logos/peter-lynn.webp";
import reflex from "@/public/assets/img/brand-logos/reflex.webp";
import ripcurl from "@/public/assets/img/brand-logos/ripcurl.webp";
import ryder from "@/public/assets/img/brand-logos/ryder.webp";
import softech from "@/public/assets/img/brand-logos/softech.webp";
import surfica from "@/public/assets/img/brand-logos/surfica.webp";
import xcel from "@/public/assets/img/brand-logos/xcel.webp";

interface Brand {
  name: string;
  logo: any;
}

const BrandsList: Brand[] = [
  { name: "Aipa", logo: aipa },
  { name: "dakine", logo: dakine },
  { name: "funkshen", logo: funkshen },
  { name: "gopro", logo: gopro },
  { name: "jaked", logo: jaked },
  { name: "loftsails", logo: loftsails },
  { name: "mystic", logo: mystic },
  { name: "nomads", logo: nomads },
  { name: "oceanStorm", logo: oceanStorm },
  { name: "peterLynn", logo: peterLynn },
  { name: "reflex", logo: reflex },
  { name: "ripcurl", logo: ripcurl },
  { name: "ryder", logo: ryder },
  { name: "softech", logo: softech },
  { name: "surfica", logo: surfica },
  { name: "xcel", logo: xcel },
];

export const Brands: React.FC = () => {
  return (
    <div className="brands">
      <h2>More than 50 brands in store !</h2>
      <Marquee speed={40} autoFill={true} direction={"right"}>
        {BrandsList.map((brand, index) => (
          <div className="brand" key={index}>
            <Image src={brand.logo} alt={brand.name} className="brand__item" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};
