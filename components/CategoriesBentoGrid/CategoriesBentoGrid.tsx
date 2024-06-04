import React from "react";
import "./CategoriesBentoGrid.scss";
import CustomButton from "../CustomButton/CustomButton";
import surf from "@/public/assets/img/surfer-canarias.webp";
import kitesurf from "@/public/assets/img/kitesurf.webp";
import windsurf from "@/public/assets/img/windsurf.webp";
import paddleboard from "@/public/assets/img/paddle.webp";
import bodyboard from "@/public/assets/img/bodyboarder.webp";
import wingfoil from "@/public/assets/img/windfoil.webp";
import aerialBeach from "@/public/assets/img/aerial-beach.webp";
import { useRouter } from "next/navigation";

interface Category {
  name: string;
  imageUrl: string;
  redirectTo: string;
}

export const CategoriesBentoGrid: React.FC = () => {
  const router = useRouter();

  const categories: Category[] = [
    {
      name: "Surf",
      imageUrl: surf.src,
      redirectTo: "/categories/surf",
    },
    {
      name: "Kitesurf",
      imageUrl: kitesurf.src,
      redirectTo: "/categories/kitesurf",
    },
    {
      name: "Windsurf",
      imageUrl: windsurf.src,
      redirectTo: "/categories/windsurf",
    },
    {
      name: "Paddleboard",
      imageUrl: paddleboard.src,
      redirectTo: "/categories/paddleboard",
    },
    {
      name: "Bodyboard",
      imageUrl: bodyboard.src,
      redirectTo: "/categories/bodyboard",
    },
    {
      name: "Wingfoil",
      imageUrl: wingfoil.src,
      redirectTo: "/categories/wingfoil",
    },
    {
      name: "More Categories",
      imageUrl: aerialBeach.src,
      redirectTo: "/categories",
    },
  ];

  return (
    <>
      <h1 className="title">Categories</h1>
      <div className="bento-grid">
        {categories.map((category, index) => (
          <div
            className={`card card-${index + 1}`}
            key={index}
            style={{
              backgroundImage: `url(${category.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <CustomButton
              text={category.name}
              disabled={undefined}
              onClick={() => {
                router.push(category.redirectTo);
              }}
              type="submit"
            />
          </div>
        ))}
      </div>
    </>
  );
};
