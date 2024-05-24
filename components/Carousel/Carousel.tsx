"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import slide1 from "../../public/assets/img/flag-beach.webp";
import slide2 from "../../public/assets/img/surfboard.webp";

import "./Carousel.scss";

export const Carousel: React.FC = () => {
  const images = [slide1, slide2];

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index}>
            <div>
              <Image
                src={imageUrl}
                alt="image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </SwiperSlide>
        ))}
        <div></div>
      </Swiper>
    </>
  );
};
