import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import CustomButton from "../CustomButton/CustomButton";
import { RootState } from "@/store/store";

import "./ProductCard.scss";

interface ProductCardProps {
  id: string;
  images: string[];
  name: string;
  description: string;
  price: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  images,
  name,
  description,
  price,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state: RootState) => state.cart);

  const handleDetailsClick = () => {
    router.push(`/products/${id}`);
  };

  const handleAddToCart = () => {
    dispatch(
      addItem({
        id,
        name,
        price,
        quantity: 1,
        image: images[0],
      })
    );
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
        <div className="action-buttons">
          <CustomButton
            text="More Details"
            onClick={handleDetailsClick}
            type="button"
          />
          <CustomButton
            text="Add to Cart"
            onClick={handleAddToCart}
            type="button"
            secondary
          />
        </div>
      </div>
      <div className="content">
        <h2>{name.toUpperCase()}</h2>
        <p className="price">€ {price.toFixed(2)}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};
