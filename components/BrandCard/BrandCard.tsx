"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Brand } from "@/types";
import "./BrandCard.scss";

interface BrandCardProps {
  brand: Brand;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/products?brand=${encodeURIComponent(brand.name)}`);
  };

  return (
    <div className="brand-card" onClick={handleClick}>
      <div className="brand-card__img-container">
        <Image
          src={brand.imageUrl}
          alt={brand.name}
          layout="fill"
          objectFit="contain"
          priority
        />
        <h3 className="brand-card__title">{brand.name}</h3>
      </div>
    </div>
  );
};
