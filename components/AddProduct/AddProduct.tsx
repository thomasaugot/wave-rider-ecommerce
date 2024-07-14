import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./AddProduct.scss";
import CustomButton from "../CustomButton/CustomButton";

interface AddProductProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    id: string;
    stock: number;
    name: string;
    price: number;
    description: string;
    images: string[];
    categories: string[];
    created_at: string;
    brand: string;
  }) => void;
}

export const AddProduct: React.FC<AddProductProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(10);
  const [images, setImages] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brand, setBrand] = useState("");
  const [createdAt] = useState(new Date().toISOString());
  const [id, setId] = useState("");

  useEffect(() => {
    if (isOpen) {
      setId(uuidv4());
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct({
      id,
      stock,
      name,
      price,
      description,
      images,
      categories,
      created_at: createdAt,
      brand,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-form">
          <div className="left-block">
            <div className="input-item">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="stock">Stock</label>
              <input
                id="stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="images">Images (comma-separated URLs)</label>
              <input
                id="images"
                type="text"
                value={images.join(",")}
                onChange={(e) => setImages(e.target.value.split(","))}
                placeholder="image1.jpg,image2.jpg"
              />
            </div>
          </div>
          <div className="right-block">
            <div className="input-item">
              <label htmlFor="brand">Brand</label>
              <input
                id="brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                required
              />
            </div>
            <div className="input-item">
              <label htmlFor="categories">Categories (comma-separated)</label>
              <input
                id="categories"
                type="text"
                value={categories.join(",")}
                onChange={(e) => setCategories(e.target.value.split(","))}
                placeholder="category1,category2"
              />
            </div>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
        </form>
        <div className="actions-container">
          <CustomButton
            type="submit"
            text="Add Product"
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
  );
};
