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

const testimonials = [
  {
    name: "John Doe",
    image: "https://i.pravatar.cc/500?img=7",
    message:
      "I've been buying surf gear from this shop for years, and I'm always impressed by the quality and variety of products they offer. Whether I need a new board, wetsuit, or accessories, they have everything I need to hit the waves in style. Highly recommended!",
  },
  {
    name: "Jane Smith",
    image: "https://i.pravatar.cc/500?img=27",
    message:
      "As a beginner surfer, I was nervous about purchasing my first board online, but this shop made the process easy and enjoyable. Their customer service team was incredibly helpful and guided me through the selection process, ensuring I found the perfect board for my skill level and preferences. Thanks to them, I'm now catching waves and loving every minute of it!",
  },
  {
    name: "Emily Johnson",
    image: "https://i.pravatar.cc/500?img=23",
    message:
      "I stumbled upon this surf shop while planning my vacation, and I'm so glad I did! Not only did they have a great selection of surfboards and gear, but their staff was incredibly friendly and knowledgeable. They helped me find the perfect board for my skill level, and I had an amazing time catching waves during my trip. I'll definitely be back!",
  },
  {
    name: "Alex Rodriguez",
    image: "https://i.pravatar.cc/500?img=12",
    message:
      "I've been surfing for years, and this shop is hands down the best place to get all my gear. Their selection is unbeatable, and their staff is always friendly and helpful. Whether I need a new board, wetsuit, or accessories, I know I can trust this shop to have exactly what I need. Highly recommend!",
  },
  {
    name: "Sophia Garcia",
    image: "https://i.pravatar.cc/500?img=38",
    message:
      "I recently took up surfing as a hobby, and this shop has been instrumental in helping me get started. Their beginner-friendly boards and equipment made it easy for me to learn the ropes, and their staff provided me with valuable tips and advice. Thanks to them, I'm now confident out on the water and having a blast!",
  },
];

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
