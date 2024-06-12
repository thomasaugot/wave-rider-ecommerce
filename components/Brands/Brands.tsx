import "./Brands.scss";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useFramerMotion } from "@/hooks/useFramerMotion";
import { useRouter } from "next/navigation";

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
import xcel from "@/public/assets/img/brand-logos/xcel.webp";
import surfica from "@/public/assets/img/brand-logos/surfica.webp";
import billabong from "@/public/assets/img/brand-logos/billabong.png";
import quiksilver from "@/public/assets/img/brand-logos/quicksilver.webp";
import roxy from "@/public/assets/img/brand-logos/roxy.webp";
import volcom from "@/public/assets/img/brand-logos/volcom.webp";
import rusty from "@/public/assets/img/brand-logos/rusty.webp";
import hurley from "@/public/assets/img/brand-logos/hurley.webp";
import vissla from "@/public/assets/img/brand-logos/vissla.webp";
import patagonia from "@/public/assets/img/brand-logos/patagonia.webp";
import rvca from "@/public/assets/img/brand-logos/rvca.webp";
import element from "@/public/assets/img/brand-logos/element.webp";
import oneill from "@/public/assets/img/brand-logos/oneill.webp";

import CustomButton from "../CustomButton/CustomButton";

interface Brand {
  name: string;
  logo: any;
}

const brands = [
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
  { name: "Billabong", logo: billabong },
  { name: "Quiksilver", logo: quiksilver },
  { name: "Roxy", logo: roxy },
  { name: "Volcom", logo: volcom },
  { name: "Rusty", logo: rusty },
  { name: "Hurley", logo: hurley },
  { name: "Vissla", logo: vissla },
  { name: "Patagonia", logo: patagonia },
  { name: "RVCA", logo: rvca },
  { name: "Element", logo: element },
  { name: "O'Neill", logo: oneill },
];

const variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const Brands: React.FC = () => {
  const router = useRouter();

  return (
    <div className="brands">
      {useFramerMotion({
        variants,
        children: (
          <>
            <h2>All your favorite brands in one place !</h2>
            <Marquee
              speed={40}
              autoFill={true}
              direction={"right"}
              className="marquee"
            >
              {brands.map((brand, index) => (
                <div className="brand" key={index}>
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    className="brand__item"
                  />
                </div>
              ))}
            </Marquee>
            <CustomButton
              text={"All our Brands"}
              onClick={() => router.push("/brands")}
            />
          </>
        ),
      })}
    </div>
  );
};
