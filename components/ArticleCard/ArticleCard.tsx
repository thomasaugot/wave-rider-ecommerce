import React from "react";
import "./ArticleCard.scss";
import Image from "next/image";

interface ArticleCardProps {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  buttonLabel: string;
  onButtonClick: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  imageUrl,
  name,
  description,
  price,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <div className="article-card">
      <Image
        src={imageUrl}
        alt={name}
        width={300}
        height={300}
        layout="fixed"
      />
      <div className="content">
        <h2>{name}</h2>
        <p>{description}</p>
        <p>{price}</p>
        <div className="button-container">
          <button onClick={onButtonClick}>{buttonLabel}</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
