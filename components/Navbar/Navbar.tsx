"use client";

import React, { useEffect, useState } from "react";
import "./Navbar.scss";
import Link from "next/link";
import Image from "next/image";
import logo from "../../public/assets/img/logo.webp";
import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize(); // Call once to set the initial value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="promotion_banner">
        Free shipping for orders over a 60€
      </div>
      <div className="navbar-container">
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <linearGradient
              id="bottomGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(0, 172, 193, 0.3)" />
              <stop offset="100%" stopColor="rgba(84, 58, 183, 0.3)" />
            </linearGradient>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(0, 172, 193, 0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(0, 172, 193, 0.1)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="url(#bottomGradient)"
            />
          </g>
        </svg>
        <a href="#">
          <Image src={logo} alt="logo" className="logo" />
        </a>
        <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle} />
        <label htmlFor="menu-toggle" className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </label>
        <div className="menu-items">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Surf
              </Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Bodyboard
              </Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Paddlesurf
              </Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Kitesurf
              </Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Windsurf
              </Link>
            </li>
            <li>
              <Link href="/products" className="menu-links">
                Accessories
              </Link>
            </li>
            <li>
              <Link href="/categories" className="menu-links">
                All Categories
                {/* {!isMobile && <FaChevronDown />} */}
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <Link href="#">
                <FaSearch />
              </Link>
            </li>
            <li>
              <Link href="#">
                <IoPerson />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FaHeart />
              </Link>
            </li>
            <li>
              <Link href="#">
                <FaShoppingCart />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
