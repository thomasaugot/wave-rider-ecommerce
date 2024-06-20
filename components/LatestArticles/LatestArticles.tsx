import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import { useProducts } from "@/context/productContext";
import "./LatestArticles.scss";
import { Product } from "@/types";

export const LatestArticles: React.FC = () => {
  const { products } = useProducts();
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const filterLatestProducts = (products: Product[]) => {
    return products.slice(0, 5);
  };

  const latestProducts = filterLatestProducts(products);
  const router = useRouter();

  useEffect(() => {
    const initSwiper = () => {
      if (swiperInstance) {
        swiperInstance.update();
      }
    };

    initSwiper();
  }, [swiperInstance]);

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
        onSwiper={handleSwiper}
        onSlideChange={(swiper) => updateNavigationVisibility(swiper)}
      >
        {latestProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="link-container">
        <CustomButton
          text={"View All Products"}
          onClick={() => router.push("/products")}
        />
      </div>
    </div>
  );
};
