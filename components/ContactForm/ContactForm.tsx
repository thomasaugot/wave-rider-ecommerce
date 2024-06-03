"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./ContactForm.scss";
import CustomButton from "../CustomButton/CustomButton";

export const ContactForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stateMessage, setStateMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (
      !nameRef.current?.value ||
      !emailRef.current?.value ||
      !messageRef.current?.value
    ) {
      setStateMessage("Veuillez remplir tous les champs.");
      setIsSubmitting(false);
      setTimeout(() => {
        setStateMessage(null);
      }, 5000);
      return;
    }

    const templateParams = {
      to_name: "Thomas",
      from_name: nameRef.current.value,
      message: messageRef.current.value,
      email: emailRef.current.value,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_PUBLIC_KEY!
      )
      .then(
        function (response) {
          setStateMessage("Message sent!");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        },
        function (error) {
          setStateMessage("Sending failed, please try again later");
          setIsSubmitting(false);
          setTimeout(() => {
            setStateMessage(null);
          }, 5000);
        }
      );

    nameRef.current.value = "";
    emailRef.current.value = "";
    messageRef.current.value = "";
  };

  return (
    <form className="contact_form" onSubmit={sendMessage}>
      <div className="form_group">
        <input type="text" ref={nameRef} placeholder="Your name" />
      </div>
      <div className="form_group">
        <input type="email" ref={emailRef} placeholder="Your email" />
      </div>
      <div className="form_group">
        <textarea
          ref={messageRef}
          rows={6}
          placeholder="Your message"
        ></textarea>
      </div>
      <CustomButton
        text={"Send"}
        disabled={isSubmitting}
        onClick={undefined}
        type="submit"
      />
      <div className="message">
        {stateMessage && <p className="message_text">{stateMessage}</p>}
      </div>
    </form>
  );
};
