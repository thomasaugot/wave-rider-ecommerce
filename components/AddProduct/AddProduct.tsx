"use client";

import React, { useState } from "react";
import { addProduct } from "@/services/apiCalls";

import "./AddProduct.scss";
import CustomButton from "../CustomButton/CustomButton";

export const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    images: "",
    stock: "",
    is_on_sale: false,
    new_price: "",
    categories: "",
    brand: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addProduct(product);
      console.log("Product added:", response);
      setProduct({
        name: "",
        description: "",
        price: "",
        images: "",
        stock: "",
        is_on_sale: false,
        new_price: "",
        categories: "",
        brand: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="product-form">
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Price:
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Images (comma separated URLs):
        <input
          type="text"
          name="images"
          value={product.images}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Stock:
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Is On Sale:
        <input
          type="checkbox"
          name="is_on_sale"
          checked={product.is_on_sale}
          onChange={handleChange}
        />
      </label>
      <label>
        New Price:
        <input
          type="number"
          name="new_price"
          value={product.new_price}
          onChange={handleChange}
        />
      </label>
      <label>
        Categories (comma separated):
        <input
          type="text"
          name="categories"
          value={product.categories}
          onChange={handleChange}
        />
      </label>
      <label>
        Brand:
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          required
        />
      </label>
      <CustomButton text={"Add Product"} onClick={undefined} type="submit" />
    </form>
  );
};
