import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import ArticleCard from "../ArticleCard/ArticleCard";
import { Product } from "@/types/product";
import "./LatestArticles.scss";
import Image from "next/image";
import flamingoFloat from "@/public/assets/img/flamingo.png";
import starfish from "@/public/assets/img/starfish.png";
import Link from "next/link";

interface LatestArticlesProps {
  products: Product[];
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ products }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const filterLatestProducts = (products: Product[]) => {
    const now = new Date();
    const sevenDaysAgo = new Date(now);
    sevenDaysAgo.setDate(now.getDate() - 7);

    return products.filter(
      (product) => new Date(product.created_at) >= sevenDaysAgo
    );
  };

  const latestProducts = filterLatestProducts(products);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
    updateNavigationVisibility(swiper);
  };

  const updateNavigationVisibility = (swiper: any) => {
    if (!swiper) return;
    const { isBeginning, isEnd } = swiper;
    const prevButton = swiper.navigation.prevEl;
    const nextButton = swiper.navigation.nextEl;
    if (prevButton) prevButton.style.display = isBeginning ? "none" : "block";
    if (nextButton) nextButton.style.display = isEnd ? "none" : "block";
  };

  return (
    <div className="latest-articles">
      <div className="title-container">
        <h1>Latest Products</h1>
        <Image
          src={flamingoFloat}
          alt="flamingo float"
          className="flamingo-img"
        />
        <Image src={starfish} alt="starfish" className="starfish-img" />
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={handleSwiper}
        onSlideChange={(swiper) => updateNavigationVisibility(swiper)}
      >
        {latestProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ArticleCard
              imageUrl={product.images[0]}
              name={product.name}
              description={product.description}
              price={product.price}
              buttonLabel="More Details"
              onButtonClick={() => alert(`Clicked on ${product.name}`)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="link-container">
        <Link href="#">View All Products</Link>
      </div>
    </div>
  );
};
