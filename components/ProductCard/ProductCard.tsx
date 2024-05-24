import React from "react";
import Image from "next/image";
import Link from "next/link";

import "./ProductCard.scss";

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
        <button className="details-button">
          <Link href={`/product-details/${id}`}>More Details</Link>
        </button>
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
