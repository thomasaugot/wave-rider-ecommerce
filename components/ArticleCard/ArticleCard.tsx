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
      <div className="image-container">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="article-image"
        />
        <button className="details-button" onClick={onButtonClick}>
          {buttonLabel}
        </button>
      </div>
      <div className="content">
        <h2>{name}</h2>
        <p className="price">€ {price.toFixed(2)}</p>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

export default ArticleCard;
