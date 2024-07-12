import React from "react";
import { ContactForm } from "@/components/ContactForm/ContactForm";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./contact-us.scss";

export default function ContactUs() {
  return (
    <div className="contact-container">
      <h2>
        If you need assistance selecting the right product for you then get in
        touch!
      </h2>
      <p>
        Our friendly staff can offer you expert advice 7 days a week over the
        phone, by email or at one of our stores. We’re here to help you get on
        board!
      </p>

      <ContactForm />
      <h2>A question? An inquiry? You can also reach out to us at :</h2>
      <a href="tel:+1234567890">
        <FaPhoneAlt className="phone-icon" />{" "}
        <span className="phone-number"> +34 123 456 789</span>
      </a>
      <a href="mailto:thomas.augot@hotmail.fr">
        <MdEmail className="email-icon" />{" "}
        <span className="email-address">info@waverider.es</span>
      </a>
      <h2>Connect on social media :</h2>
      <div className="social-media-icons">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FaFacebook />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="icon"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
}
