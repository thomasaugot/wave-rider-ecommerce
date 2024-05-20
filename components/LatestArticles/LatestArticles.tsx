import React from "react";
import "./LatestArticles.scss";
import Image from "next/image";
import leaf1 from "@/public/assets/img/leaf3.webp";

export const LatestArticles: React.FC = () => {
  return (
    <div className="latest-articles">
      <Image src={leaf1} alt="Banana tree leaf" />
    </div>
  );
};
