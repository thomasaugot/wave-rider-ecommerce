"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Category } from "@/types";
import "./CategoryCard.scss";

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const router = useRouter();

  return (
    <div
      className="category-card"
      onClick={() => router.push(category.redirectTo)}
    >
      <div className="category-card__img-container">
        <Image
          src={category.imageUrl}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          priority
        />
        <h3 className="category-card__title">{category.name}</h3>
      </div>
    </div>
  );
};
