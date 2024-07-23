import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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

interface FormValues {
  name: string;
  description: string;
  price?: number;
  images: string;
}

export const EditProduct: React.FC<EditProductProps> = ({
  isOpen,
  onClose,
}) => {
  const dispatch: any = useDispatch();
  const selectedProduct = useSelector(selectSelectedProduct);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: undefined,
      images: "",
    },
  });

  useEffect(() => {
    if (selectedProduct) {
      setValue("name", selectedProduct.name || "");
      setValue("description", selectedProduct.description || "");
      setValue("price", selectedProduct.price || 0);
      setValue("images", selectedProduct.images.join(",") || "");
    }
  }, [selectedProduct, setValue]);

  const onSubmit = (data: FormValues) => {
    if (!data.images.trim()) {
      setError("images", {
        type: "manual",
        message: "Images are required",
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

    dispatch(
      editProductThunk({
        ...selectedProduct,
        ...data,
        images: data.images.split(","),
      })
    );
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="edit-form">
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
                    min: {
                      value: 0.01,
                      message: "Price must be greater than 0",
                    },
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
                  name="images"
                  control={control}
                  rules={{ required: "Images are required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Images (comma-separated URLs)"
                      className={errors.images ? "input-error" : ""}
                    />
                  )}
                />
                {errors.images && (
                  <p className="error-message">{errors.images.message}</p>
                )}
              </div>
            </div>
            <div className="right-block">
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
              text="Save Changes"
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
    </Portal>
  );
};
