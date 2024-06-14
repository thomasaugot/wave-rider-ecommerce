import "./Brands.scss";
import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useFramerMotion } from "@/hooks/useFramerMotion";
import { useRouter } from "next/navigation";
import { brands } from "@/constants/brands";
import CustomButton from "../CustomButton/CustomButton";

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
