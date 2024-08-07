import React from "react";
import { useExodarFont } from "@/hooks/useExodarFont";
import "./CustomButton.scss";

interface CustomButtonProps {
  text: string;
  onClick: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  secondary?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  disabled,
  type,
  secondary = false,
}) => {
  useExodarFont();
  return (
    <button
      className={`custom-button ${disabled ? "disabled" : ""} ${
        secondary ? "secondary" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      <p>{text}</p>
    </button>
  );
};

export default CustomButton;
