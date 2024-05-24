import React from "react";
import Link from "next/link";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhoneAlt,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./Footer.scss";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>
                <Link href="/contact">Contact Us</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Shop</h4>
            <ul>
              <li>
                <Link href="/products">All Products</Link>
              </li>
              <li>
                <Link href="/categories">Categories</Link>
              </li>
              <li>
                <Link href="/brands">Brands</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Legal</h4>
            <ul>
              <li>
                <Link href="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="mailto:thomas.augot@hotmail.fr">
                  <MdEmail className="email-icon" />{" "}
                  <span className="email-address">info@waverider.es</span>
                </a>
              </li>
              <li>
                <a href="tel:+1234567890">
                  <FaPhoneAlt className="phone-icon" />{" "}
                  <span className="phone-number"> +34 123 456 789</span>
                </a>
              </li>
              <li>
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
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <p>
                &copy; {new Date().getFullYear()} Wave Rider Surf Shop. All
                rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
