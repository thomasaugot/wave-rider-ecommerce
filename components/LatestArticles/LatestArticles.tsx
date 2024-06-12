import React, { useState } from "react";
import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import CustomButton from "../CustomButton/CustomButton";
import { useRouter } from "next/navigation";
import "./LatestArticles.scss";

interface LatestArticlesProps {
  products: Product[];
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ products }) => {
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const filterLatestProducts = (products: Product[]) => {
    return products; // to be modified later
  };

  const latestProducts: Product[] = filterLatestProducts(products);
  const router = useRouter();

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
            <ProductCard addToCartButton={undefined} {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="link-container">
        <CustomButton
          text={"View All Products"}
          onClick={() => router.push("/all-products")}
        />
      </div>
    </div>
  );
};
