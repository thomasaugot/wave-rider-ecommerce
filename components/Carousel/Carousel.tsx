import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import slide1 from "../../public/assets/img/surfboard.jpg";
import slide2 from "../../public/assets/img/beach-surfers.jpg";
import slide3 from "../../public/assets/img/homepage-bg.jpg";
import "./Carousel.scss";

export const Carousel: React.FC = () => {
  const images = [slide1, slide2, slide3];

  console.log("slide 1: ", slide1);
  console.log("slide 2: ", slide2);
  console.log("slide 3: ", slide3);

  return (
    <>
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        className="swiper"
      >
        {images.map((imageUrl, index) => (
          <SwiperSlide key={index} className="swiper__slide">
            <div className="swiper__slide__img-container">
              <Image
                src={imageUrl}
                alt="image"
                layout="fill"
                objectFit="cover"
                className="swiper__slide__img-container__img"
              />
            </div>
          </SwiperSlide>
        ))}
        <div></div>
      </Swiper>
    </>
  );
};
