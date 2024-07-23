import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { ProductCard } from "@/components/ProductCard/ProductCard";
import { Product } from "@/types";

import "./SimilarProducts.scss";

interface SimilarProductsProps {
  currentProduct: Product;
}

export const SimilarProducts: React.FC<SimilarProductsProps> = ({
  currentProduct,
}) => {
  const products = useSelector((state: RootState) => state.products.products);
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    const fetchSimilarProducts = () => {
      if (!currentProduct || !currentProduct.categories) return;

      const similarByName = products.filter(
        (product) =>
          product?.name
            .toLowerCase()
            .includes(currentProduct.name.toLowerCase()) &&
          product.id !== currentProduct.id
      );

      if (similarByName.length === 0) {
        const similarByCategory = products?.filter(
          (product) =>
            product.categories?.some((category) =>
              currentProduct.categories?.includes(category)
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
    const prevButton = swiper?.navigation?.prevEl;
    const nextButton = swiper?.navigation?.nextEl;
    if (prevButton)
      prevButton.style.display =
        isBeginning || similarProducts?.length < 3 ? "none" : "block";
    if (nextButton)
      nextButton.style.display =
        isEnd || similarProducts?.length < 3 ? "none" : "block";
  };

  useEffect(() => {
    if (swiperInstance) {
      swiperInstance?.update();
      updateNavigationVisibility(swiperInstance);
    }
  }, [swiperInstance, similarProducts]);

  return (
    <div className="similar-products">
      <h2>Similar Products</h2>
      <Swiper
        initialSlide={0}
        slidesPerView={1}
        spaceBetween={10}
        navigation={similarProducts.length >= 4}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 20 },
          768: { slidesPerView: 3, spaceBetween: 20 },
        }}
        modules={[Navigation]}
        className="mySwiper"
        onSwiper={handleSwiper}
        onSlideChange={(swiper) => updateNavigationVisibility(swiper)}
        centeredSlides={false}
        watchOverflow={true}
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
