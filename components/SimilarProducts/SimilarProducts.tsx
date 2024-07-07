import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useProducts } from "@/context/productContext";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import "./SimilarProducts.scss";
import { Product } from "@/types";

interface SimilarProductsProps {
  currentProduct: Product;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
}) => {
  const { products } = useProducts();
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchSimilarProducts = () => {
      const similarByName = products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(currentProduct.name.toLowerCase()) &&
          product.id !== currentProduct.id
      );

      if (similarByName.length === 0) {
        const similarByCategory = products.filter(
          (product) =>
            product.categories.some((category) =>
              currentProduct.categories.includes(category)
            ) && product.id !== currentProduct.id
        );
        setSimilarProducts(similarByCategory.slice(0, 4));
      } else {
        setSimilarProducts(similarByName.slice(0, 4));
      }
    };

    fetchSimilarProducts();
  }, [currentProduct, products]);

  const handleSwiper = (swiper: any) => {
    setSwiperInstance(swiper);
    updateNavigationVisibility(swiper);
  };

  const updateNavigationVisibility = (swiper: any) => {
    if (!swiper) return;
    const { isBeginning, isEnd } = swiper;
    const prevButton = swiper.navigation.prevEl;
    const nextButton = swiper.navigation.nextEl;
    if (prevButton)
      prevButton.style.display =
        isBeginning || similarProducts.length < 4 ? "none" : "block";
    if (nextButton)
      nextButton.style.display =
        isEnd || similarProducts.length < 4 ? "none" : "block";
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance.update();
      updateNavigationVisibility(swiperInstance);
    }
  }, [swiperInstance, similarProducts]);

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={similarProducts.length >= 4} // Only enable navigation if there are 4 or more products
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
        {similarProducts.length > 0 ? (
          similarProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard {...product} />
            </SwiperSlide>
          ))
        ) : (
          <p>No similar products found.</p>
        )}
      </Swiper>
    </div>
  );
};
