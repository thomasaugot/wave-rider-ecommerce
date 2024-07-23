"use client";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";
import gradientSurfBoard from "@/public/assets/img/gradient-surfboard.webp";
import CustomButton from "../CustomButton/CustomButton";
import Image from "next/image";

import "./ContactForm.scss";

interface FormInputs {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    setIsSubmitting(true);

    const templateParams = {
      to_name: "Thomas",
      from_name: data.name,
      message: data.message,
      email: data.email,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        () => {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          reset();
          setTimeout(() => setStateMessage(null), 5000);
        },
        () => {
          setStateMessage("Sending failed, please try again later");
          setIsSubmitting(false);
          setTimeout(() => setStateMessage(null), 5000);
        }
      );
  };

  return (
    <div className="form-container">
      <form className="contact_form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_group">
          <input
            type="text"
            placeholder="Your name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
        </div>
        <div className="form_group">
          <input
            type="email"
            placeholder="Your email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>
        <div className="form_group">
          <textarea
            rows={6}
            placeholder="Your message"
            {...register("message", { required: "Message is required" })}
          />
          {errors.message && (
            <p className="error-message">{errors.message.message}</p>
          )}
        </div>
        <div className="button-container">
          <CustomButton
            text={"Send"}
            disabled={isSubmitting}
            type="submit"
            onClick={undefined}
          />
        </div>

        <div className="message">{stateMessage && <p>{stateMessage}</p>}</div>
      </form>
      <Image src={gradientSurfBoard} alt="Gradient surf board illustration" />
    </div>
  );
};
