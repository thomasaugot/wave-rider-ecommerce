import React from "react";
import "./CustomButton.scss";

interface CustomButtonProps {
  text: string;
  onClick: any;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onClick,
  disabled,
  type,
}) => {
  return (
    <button
      className={`custom-button ${disabled ? "disabled" : ""}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {text}
    </button>
  );
};

export default CustomButton;
