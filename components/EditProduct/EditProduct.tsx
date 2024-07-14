import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editProductThunk,
  selectSelectedProduct,
} from "@/store/slices/productSlice";
import Portal from "../Portal/Portal";
import CustomButton from "../CustomButton/CustomButton";
import "./EditProduct.scss";

interface EditProductProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EditProduct: React.FC<EditProductProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch: any = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    images: [""],
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        id: selectedProduct.id || "",
        name: selectedProduct.name || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || 0,
        images: selectedProduct.images || [""],
      });
    }
  }, [selectedProduct]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.split(",") }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editProductThunk(formData));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="left-block">
              <div className="input-item">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="images">Images (comma-separated URLs)</label>
                <input
                  id="images"
                  type="text"
                  name="images"
                  value={formData.images.join(",")}
                  onChange={handleArrayChange}
                  placeholder="image1.jpg,image2.jpg"
                />
              </div>
            </div>
            <div className="right-block">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
          </form>
          <div className="actions-container">
            <CustomButton
              type="submit"
              text="Save Changes"
              onClick={handleSubmit}
            />
            <CustomButton
              type="button"
              text="Cancel"
              onClick={onClose}
              secondary={true}
            />
          </div>
        </div>
      </div>
    </Portal>
  );
};
