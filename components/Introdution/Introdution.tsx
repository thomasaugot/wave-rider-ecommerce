import React from "react";
import { useFramerMotion } from "@/hooks/useFramerMotion";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import "./Introdution.scss";

export const Introdution: React.FC = () => {
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

  const router = useRouter();

  return (
    <div className="presentation">
      {useFramerMotion({
        variants,
        children: (
          <>
            <h2 className="presentation__title">
              The specialist in surf and water sports gear
            </h2>
            <p className="presentation__description">
              Your one-stop shop for all water sports needs
            </p>
            <CustomButton
              text={"View All Products"}
              onClick={() => router.push("/all-products")}
            />
          </>
        ),
      })}
    </div>
  );
};
