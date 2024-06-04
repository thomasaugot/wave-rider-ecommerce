import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import "./ProductCard.scss";
import CustomButton from "../CustomButton/CustomButton";

interface ProductCardProps {
  id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  addToCartButton: React.ReactNode;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  images,
  name,
  description,
  price,
  addToCartButton,
}) => {
  const router = useRouter();

  return (
    <div className="product-card" key={id}>
      <div className="image-container">
        <Image
          src={images[0]}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="Product-image"
        />
        <div className="details-button">
          <CustomButton
            text={"More Details"}
            disabled={undefined}
            onClick={() => router.push(`/product-details/${id}`)}
            type="submit"
          />
        </div>
      </div>
      <div className="content">
        <h2>{name.toUpperCase()}</h2>
        <p className="price">€ {price.toFixed(2)}</p>
        <p className="description">{description}</p>
        {addToCartButton}
      </div>
    </div>
  );
};
