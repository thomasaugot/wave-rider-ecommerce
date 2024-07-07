"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "@/context/cartContext";
import { useUser } from "@/context/userContext";
import logo from "../../public/assets/img/logo.png";
import "./Navbar.scss";
import { WavyAnimation } from "@/components/WavyAnimation/WavyAnimation";

interface MenuItem {
  label: string;
  category?: string;
  url: string;
}

export const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { cartState } = useCart();
  const { user } = useUser();
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const handleMenuToggle = () => setMenuOpen(!menuOpen);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    };

    if (isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile]);

  const handleMenuItemClick = (url: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      router.push(url);
    }, 300);
  };

  const menuItems: MenuItem[] = [
    { label: "Surf", category: "surf", url: "/products?category=surf" },
    {
      label: "Bodyboard",
      category: "bodyboard",
      url: "/products?category=bodyboard",
    },
    { label: "Sup", category: "sup", url: "/products?category=sup" },
    {
      label: "Kitesurf",
      category: "kitesurf",
      url: "/products?category=kitesurf",
    },
    {
      label: "Windsurf",
      category: "windsurf",
      url: "/products?category=windsurf",
    },
    { label: "Accessories", url: "/products?category=accessories" },
    { label: "All Categories", url: "/categories" },
  ];

  return (
    <nav className={`navbar ${menuOpen ? "open" : ""}`}>
      <div className="navbar-container">
        <WavyAnimation />
        <Link href="/">
          <Image src={logo} alt="logo" className="logo" />
        </Link>
        <div className="mobile-top-icons">
          {isMobile && (
            <>
              <Link href="#">
                <FaSearch onClick={() => handleMenuItemClick("/products")} />
              </Link>
              <Link
                href="/shopping-cart"
                onClick={() => handleMenuItemClick("/shopping-cart")}
              >
                <div className="cart-icon">
                  <FaShoppingCart className="nav-icon" />
                  <span className="cart-count">{cartState.items.length}</span>
                </div>
              </Link>
            </>
          )}
        </div>
        <input type="checkbox" checked={menuOpen} onChange={handleMenuToggle} />
        <label htmlFor="menu-toggle" className="hamburger-lines">
          <span className="line line1"></span>
          <span className="line line2"></span>
          <span className="line line3"></span>
        </label>
        <div className="menu-items">
          <ul>
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.url}
                  className="menu-links"
                  onClick={() => handleMenuItemClick(item.url)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul>
            {!isMobile && (
              <li>
                <Link href="#">
                  <FaSearch
                    className="nav-icon"
                    onClick={() => handleMenuItemClick("/products")}
                  />
                </Link>
              </li>
            )}
            <li>
              <Link
                href={user ? `/profile?userId=${user.id}` : "/authentication"}
                onClick={() =>
                  handleMenuItemClick(
                    user ? `/profile?userId=${user.id}` : "/authentication"
                  )
                }
              >
                <IoPerson className="nav-icon profile-icon" />
              </Link>
            </li>
            {!isMobile && (
              <li>
                <Link href="/shopping-cart">
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
    </nav>
  );
};
