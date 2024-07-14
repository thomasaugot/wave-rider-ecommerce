import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "@/store/slices/cartSlice";
import CustomButton from "../CustomButton/CustomButton";
import { RootState } from "@/store/store";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  setSelectedProduct,
  deleteProductThunk,
} from "@/store/slices/productSlice";
import { EditProduct } from "../EditProduct/EditProduct";
import { selectCart } from "@/store/slices/cartSlice";
import { selectIsAdmin } from "@/store/slices/userSlice";

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
  const dispatch: any = useDispatch();
  const { items } = useSelector(selectCart);
  const isAdmin = useSelector(selectIsAdmin);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

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

  const handleEditClick = () => {
    dispatch(setSelectedProduct({ id, images, name, description, price }));
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    dispatch(deleteProductThunk(id));
  };

  return (
    <>
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
          {isAdmin && (
            <div className="admin-buttons">
              <FaEdit className="edit-icon" onClick={handleEditClick} />
              <FaTrash className="delete-icon" onClick={handleDeleteClick} />
            </div>
          )}
          <h2>{name.toUpperCase()}</h2>
          <p className="price">€ {price.toFixed(2)}</p>
          <p className="description">{description}</p>
        </div>
      </div>
      {isEditModalOpen && (
        <EditProduct
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </>
  );
};
