import React, { useEffect, useRef, useState } from "react";
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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface LatestArticlesProps {
  products: Product[];
}

export const LatestArticles: React.FC<LatestArticlesProps> = ({ products }) => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const filterLatestProducts = (products: Product[]) => {
    // Filter logic here
    return products;
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
    <div className="latest-articles" ref={ref}>
      <div className="title-container">
        <h1>Latest Products</h1>
        {isVisible && (
          <motion.div variants={variants} initial="hidden" whileInView="show">
            <Image src={starfish} alt="starfish" className="starfish-img" />
          </motion.div>
        )}
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
            // Handle button click
          }}
        />
      </div>
    </div>
  );
};
