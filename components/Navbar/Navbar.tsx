"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import logo from "../../public/assets/img/logo.png";
import "./Navbar.scss";
import { WavyAnimation } from "@/components/WavyAnimation/WavyAnimation";

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { cartState } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1025);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchToggle = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  const handleMouseEnter = () => {
    setSearchOpen(true);
  };

  const handleMouseLeave = () => {
    setSearchOpen(false);
  };

  const handleSearchButtonClick = () => {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategoryClick = (category: string) => {
    router.push(
      `/products?category=${encodeURIComponent(
        category.toLowerCase().replace(" ", "-")
      )}`
    );
  };

  const menuItems = [
    { label: "Surf", onClick: () => handleCategoryClick("Surf") },
    { label: "Bodyboard", onClick: () => handleCategoryClick("Bodyboard") },
    { label: "Paddlesurf", onClick: () => handleCategoryClick("Paddlesurf") },
    { label: "Kitesurf", onClick: () => handleCategoryClick("Kitesurf") },
    { label: "Windsurf", onClick: () => handleCategoryClick("Windsurf") },
    {
      label: "Accessories",
      onClick: () => handleCategoryClick("Accessories"),
      mobileOnly: true,
    },
    { label: "All Categories", href: "/categories" },
  ];

  return (
    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <WavyAnimation />
        <a href="/">
          <Image src={logo} alt="logo" className="logo" />
        </a>

        {isMobile && (
          <div className="mobile-top-icons">
            <Link href="#" onClick={handleSearchToggle}>
              <FaSearch />
            </Link>
            <Link href={"/shopping-cart"}>
              <div className="cart-icon">
                <FaShoppingCart className="nav-icon" />
                <span className="cart-count">{cartState.items.length}</span>
              </div>
            </Link>
            <input
              type="checkbox"
              checked={menuOpen}
              onChange={handleMenuToggle}
            />
            <label htmlFor="menu-toggle" className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </label>
          </div>
        )}
        <div className="menu-items">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.href ? (
                  <Link href={item.href} className="menu-links">
                    {item.label}
                  </Link>
                ) : (
                  <a
                    onClick={item.onClick}
                    className="menu-links"
                    style={{
                      display: item.mobileOnly && !isMobile ? "none" : "block",
                    }}
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          <ul>
            {!isMobile && (
              <li>
                <Link href="#">
                  <FaSearch
                    className="nav-icon"
                    onMouseEnter={handleSearchToggle}
                  />
                </Link>
              </li>
            )}
            <li>
              <Link href="/authentication">
                <IoPerson className="nav-icon" />
              </Link>
            </li>
            {!isMobile && (
              <li>
                <Link href={"/shopping-cart"}>
                  <div className="cart-icon">
                    <FaShoppingCart className="nav-icon" />
                    <span className="cart-count">{cartState.items.length}</span>
                  </div>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
      {searchOpen && (
        <div
          className="floating-search-bar"
          ref={searchRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="search-input-container">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search a product, a brand, a sport..."
            />
            <button className="search-button" onClick={handleSearchButtonClick}>
              <FaSearch />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
