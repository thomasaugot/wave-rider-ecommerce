"use client";

import React, { useState, useEffect } from "react";
import "./Navbar.scss";
import Image from "next/image";
import logo from "../../public/assets/img/logo.webp";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaHome } from "react-icons/fa";

export const Navbar: React.FC = () => {
  return (
    <>
      <nav className="navbar" id="navbar">
        <div className="promotion_banner">
          Free shipping for orders over a 60€
        </div>
        <div className="navbar__content">
          <a className="navbar__logo" href="#">
            <Image src={logo} alt="logo" width={100} height={90} />
          </a>
          <ul>
            <li>
              <Link href="/">
                <FaHome />
              </Link>
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
              <Link href="/categories" className="menu-links">
                All Categories <FaChevronDown />
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
      </nav>
    </>
  );
};
