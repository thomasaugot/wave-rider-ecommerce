import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useForm, Controller } from "react-hook-form";
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

interface FormValues {
  name: string;
  description: string;
  price?: number;
  stock?: number;
  images: string;
  categories: string;
  brand: string;
}

export const AddProduct: React.FC<AddProductProps> = ({
  isOpen,
  onClose,
  onAddProduct,
}) => {
  const [id, setId] = useState("");
  const [createdAt] = useState(new Date().toISOString());

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      stock: undefined,
      images: "",
      categories: "",
      brand: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      setId(uuidv4());
    }
  }, [isOpen]);

  const onSubmit = (data: FormValues) => {
    if (!data.categories.trim()) {
      setError("categories", {
        type: "manual",
        message: "Categories are required",
      });
      return;
    }
    if (data.price === undefined || data.price <= 0) {
      setError("price", {
        type: "manual",
        message: "Price must be greater than 0",
      });
      return;
    }
    if (data.stock === undefined || data.stock < 0) {
      setError("stock", {
        type: "manual",
        message: "Stock must be 0 or greater",
      });
      return;
    }

    onAddProduct({
      id,
      stock: data.stock ?? 10,
      name: data.name,
      price: data.price ?? 0,
      description: data.description,
      images: data.images.split(","),
      categories: data.categories.split(","),
      created_at: createdAt,
      brand: data.brand,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="add-form">
          <div className="left-block">
            <div className="input-item">
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Name"
                    className={errors.name ? "input-error" : ""}
                  />
                )}
              />
              {errors.name && (
                <p className="error-message">{errors.name.message}</p>
              )}
            </div>
            <div className="input-item">
              <Controller
                name="price"
                control={control}
                rules={{
                  required: "Price is required",
                  min: { value: 0.01, message: "Price must be greater than 0" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Price, ex: 109.99"
                    className={errors.price ? "input-error" : ""}
                  />
                )}
              />
              {errors.price && (
                <p className="error-message">{errors.price.message}</p>
              )}
            </div>
            <div className="input-item">
              <Controller
                name="stock"
                control={control}
                rules={{
                  required: "Stock is required",
                  min: { value: 0, message: "Stock must be 0 or greater" },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    placeholder="Stock, ex: 20"
                    className={errors.stock ? "input-error" : ""}
                  />
                )}
              />
              {errors.stock && (
                <p className="error-message">{errors.stock.message}</p>
              )}
            </div>
            <div className="input-item">
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Images (comma-separated URLs)"
                  />
                )}
              />
            </div>
          </div>
          <div className="right-block">
            <div className="input-item">
              <Controller
                name="brand"
                control={control}
                rules={{ required: "Brand is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Brand"
                    className={errors.brand ? "input-error" : ""}
                  />
                )}
              />
              {errors.brand && (
                <p className="error-message">{errors.brand.message}</p>
              )}
            </div>
            <div className="input-item">
              <Controller
                name="categories"
                control={control}
                rules={{ required: "Categories are required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Categories (comma-separated)"
                    className={errors.categories ? "input-error" : ""}
                  />
                )}
              />
              {errors.categories && (
                <p className="error-message">{errors.categories.message}</p>
              )}
            </div>
            <div className="input-item">
              <Controller
                name="description"
                control={control}
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Description"
                    className={errors.description ? "input-error" : ""}
                  />
                )}
              />
              {errors.description && (
                <p className="error-message">{errors.description.message}</p>
              )}
            </div>
          </div>
        </form>
        <div className="actions-container">
          <CustomButton
            type="submit"
            text="Add Product"
            onClick={handleSubmit(onSubmit)}
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
