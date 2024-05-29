import React from "react";
import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import CustomButton from "../CustomButton/CustomButton";
import starfish from "@/public/assets/img/starfish.png";
import "./LatestArticles.scss";
import { useFramerMotion } from "@/hooks/useFramerMotion";

interface LatestArticlesProps {
  products: Product[];
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ products }) => {
  const filterLatestProducts = (products: Product[]) => {
    return products; // to be modified later
  };

  const latestProducts = filterLatestProducts(products);

  const variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 2,
        yoyo: Infinity,
      },
    },
  };

  return (
    <div className="latest-articles">
      <div className="title-container">
        <h1>Latest Products</h1>
        {useFramerMotion({
          variants,
          children: (
            <Image src={starfish} alt="Starfish" className="starfish-img" />
          ),
        })}
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 30 },
          1024: { slidesPerView: 4, spaceBetween: 40 },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {latestProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard addToCartButton={undefined} {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="link-container">
        <CustomButton
          text={"View All Products"}
          onClick={() => {
            /* Handle button click */
          }}
        />
      </div>
    </div>
  );
};
