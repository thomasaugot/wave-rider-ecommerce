import React, { useEffect, useRef, useState } from "react";
import TestimonialCard from "@/components/TestimonialCard/TestimonialCard";
import Counter from "../Counter/Counter";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/scss/pagination";
import "swiper/scss/navigation";
import "swiper/scss/autoplay";
import "./ClientsOpinions.scss";
import { testimonials } from "@/constants/testimonials";

export const ClientsOpinions: React.FC = () => {
  const counterRef: any = useRef(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsAnimating(true);
      }
    });

    if (counterRef.current instanceof HTMLElement) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current instanceof HTMLElement) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  return (
    <section className="clients-opinions" ref={counterRef}>
      <h2 className="clients-opinions__heading">
        <span>
          <Counter isAnimating={isAnimating} />+
        </span>
        <span>Clients Trusted Us</span>
      </h2>
      <Swiper
        className="clients-opinions__swiper"
        slidesPerView={3}
        spaceBetween={5}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        breakpoints={{
          300: { slidesPerView: 1 },
          501: { slidesPerView: 1 },
          769: { slidesPerView: 3, spaceBetween: 10 },
          1025: { slidesPerView: 3, spaceBetween: 10 },
        }}
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <TestimonialCard
              name={testimonial.name}
              image={testimonial.image}
              message={testimonial.message}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};
