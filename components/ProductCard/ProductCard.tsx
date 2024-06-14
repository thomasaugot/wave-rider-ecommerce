import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/productContext";

import "./ProductCard.scss";
import CustomButton from "../CustomButton/CustomButton";

interface ProductCardProps {
  id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  addToCartButton?: React.ReactNode;
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
  const { handleProductSelection } = useProducts();

  const handleDetailsClick = () => {
    handleProductSelection(id);
    router.push(`/all-products/${id}`);
  };

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
            onClick={handleDetailsClick}
            type="button"
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
