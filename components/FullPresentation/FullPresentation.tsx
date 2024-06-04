import React, { useState } from "react";
import "./FullPresentation.scss";
import CustomButton from "../CustomButton/CustomButton";

export const FullPresentation: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="container">
      <div className={`special-text ${isExpanded ? "-expanded" : ""}`}>
        <h2>Welcome to Wave Rider!</h2>
        <h2 className="intro__title">
          The specialist in surf and water sports gear
        </h2>
        <p className="intro__description">
          Your one-stop shop for all water sports needs
        </p>
        <p>
          Dive into the thrilling world of watersports with Wave Rider, your
          premier destination for all things aquatic adventure. <br /> <br />
          Nestled in the picturesque paradise of Fuerteventura, our shop is a
          beacon for enthusiasts seeking excitement on the waves. From surfing
          to windsurfing, kitesurfing to paddleboarding, we're passionate about
          every aspect of watersports. Our mission is to equip you with
          top-quality gear and expert guidance to make every moment on the water
          unforgettable. <br /> <br /> Explore our extensive collection of
          boards, sails, kites, paddles, and accessories from leading brands,
          carefully selected to elevate your experience. Whether you're a
          seasoned pro or just dipping your toes in the water, we have
          everything you need to make a splash. <br /> <br /> Join our vibrant
          community of watersports enthusiasts and embark on thrilling
          adventures together. From group outings to skill-building workshops,
          we're here to support you every step of the way. Experience the thrill
          of the ocean with Wave Rider Watersports. <br /> <br /> Come visit us
          in Fuerteventura or browse our online store – your next aquatic
          adventure awaits! At Wave Rider, we're not just about watersports –
          we're about creating unforgettable moments on the water. <br /> <br />
          Let's make waves together!
        </p>
      </div>
      <div className="button-container"></div>
      <CustomButton
        text={isExpanded ? "Read Less" : "Continue Reading"}
        onClick={handleToggleExpansion}
      />
    </div>
  );
};
