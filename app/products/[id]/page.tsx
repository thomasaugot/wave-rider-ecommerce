"use client";

import React, { useEffect, useState } from "react";
import { useProducts } from "@/context/productContext";
import { useCart } from "@/context/cartContext";
import "./product-details.scss";
import Image from "next/image";
import CustomButton from "@/components/CustomButton/CustomButton";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Autoplay, Pagination, Thumbs } from "swiper/modules";
import { Swiper as SwiperCore } from "swiper/types";
import { SimilarProducts } from "@/components/SimilarProducts/SimilarProducts";
import { Loading } from "@/components/Loading/Loading";
import { useRouter } from "next/navigation";

export default function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const { selectedProduct, handleProductSelection, products } = useProducts();
  const { dispatch } = useCart();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperCore | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (params.id) {
      console.log("Product ID:", params.id);
      console.log("Products in context:", products);
      handleProductSelection(params.id);
    }
  }, [params.id, handleProductSelection, products]);

  const addToCart = () => {
    if (selectedProduct) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          id: selectedProduct.id,
          name: selectedProduct.name,
          price: selectedProduct.price,
          quantity: 1,
          image: selectedProduct.images[0],
        },
      });
    }
  };

  const buyNow = () => {
    addToCart();
    router.push("/shopping-cart");
  };

  if (!selectedProduct) {
    return (
      <div className="product-details-page">
        <Loading />
      </div>
    );
  }

  return (
    <div className="product-details-page">
      <div className="product-details">
        <div className="img-container">
          <Swiper
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay, Thumbs]}
            autoplay={{
              delay: 3000,
            }}
            style={{ width: "100%", height: "auto" }}
            className="carousel-swiper"
            thumbs={{ swiper: thumbsSwiper }}
          >
            {selectedProduct.images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div className="main-image-wrapper">
                  <Image
                    src={imageUrl}
                    alt={selectedProduct.name}
                    layout="responsive"
                    width={800}
                    height={600}
                    objectFit="contain"
                    priority
                    className="product-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <Swiper
            onSwiper={setThumbsSwiper}
            slidesPerView={4}
            spaceBetween={10}
            watchSlidesProgress
            className="thumbnail-swiper"
          >
            {selectedProduct.images.map((imageUrl, index) => (
              <SwiperSlide key={index}>
                <div className="thumbnail-wrapper">
                  <Image
                    src={imageUrl}
                    alt={`Thumbnail ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="thumbnail-image"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="details-container">
          <h1>{selectedProduct.name}</h1>
          <p>{selectedProduct.description}</p>
          <p>Price: €{selectedProduct.price.toFixed(2)}</p>
          <div className="actions-container">
            <CustomButton text={"Add to Cart"} onClick={addToCart} />
            <CustomButton text={"Buy Now"} secondary={true} onClick={buyNow} />
          </div>
        </div>
      </div>
      <SimilarProducts currentProduct={selectedProduct} />
    </div>
  );
}
