import React from "react";
import Image from "next/image";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import { Category } from "@/types";
import surf from "@/public/assets/img/surfer-canarias.webp";
import kitesurf from "@/public/assets/img/kitesurf.webp";
import windsurf from "@/public/assets/img/windsurf.webp";
import paddleboard from "@/public/assets/img/paddle.webp";
import bodyboard from "@/public/assets/img/bodyboarder.webp";
import wingfoil from "@/public/assets/img/windfoil.webp";
import aerialBeach from "@/public/assets/img/aerial-beach.webp";
import "./CategoriesBentoGrid.scss";

export const CategoriesBentoGrid: React.FC = () => {
  const router = useRouter();

  const categories: Category[] = [
    {
      name: "Surf",
      imageUrl: surf.src,
    },
    {
      name: "Kitesurf",
      imageUrl: kitesurf.src,
    },
    {
      name: "Windsurf",
      imageUrl: windsurf.src,
    },
    {
      name: "SUP",
      imageUrl: paddleboard.src,
    },
    {
      name: "Bodyboard",
      imageUrl: bodyboard.src,
    },
    {
      name: "Wingfoil",
      imageUrl: wingfoil.src,
    },
    {
      name: "More Categories",
      imageUrl: aerialBeach.src,
    },
  ];

  const handleClick = (category: Category) => {
    if (category.name === "More Categories") {
      router.push(`/categories`);
    } else {
      const formattedCategory = category.name.toLowerCase().replace(/ /g, "-");
      router.push(`/products?category=${formattedCategory}`);
    }
  };

  return (
    <div className="categories-bento-grid">
      <h1 className="title">Categories</h1>
      <div className="bento-grid">
        {categories.map((category, index) => (
          <div className={`card card-${index + 1}`} key={index}>
            <Image
              src={category.imageUrl}
              alt={category.name}
              layout="fill"
              objectFit="cover"
              priority
            />
            <CustomButton
              text={category.name}
              onClick={() => handleClick(category)}
              type="button"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
