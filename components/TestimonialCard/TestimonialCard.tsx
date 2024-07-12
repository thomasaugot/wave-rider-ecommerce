import React from "react";
import Image from "next/image";

import "./TestimonialCard.scss";

type TestimonialCardProps = {
  name: string;
  image: string;
  message: string;
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  image,
  message,
}) => {
  return (
    <div className="testimonial-card">
      <Image
        className="testimonial-card__image"
        src={image}
        alt={`${name}'s picture`}
        width={100}
        height={100}
      />
      <div className="testimonial-card__content">
        <h3 className="testimonial-card__name">{name}</h3>
        <p className="testimonial-card__message">{message}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;
