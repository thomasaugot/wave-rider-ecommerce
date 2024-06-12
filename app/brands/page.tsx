"use client";

import React, { useState } from "react";
import { BrandCard } from "@/components/BrandCard/BrandCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Brand } from "@/types";

import aipa from "@/public/assets/img/brand-logos/aipa.webp";
import dakine from "@/public/assets/img/brand-logos/dakine.webp";
import funkshen from "@/public/assets/img/brand-logos/funkshen.webp";
import gopro from "@/public/assets/img/brand-logos/gopro.webp";
import jaked from "@/public/assets/img/brand-logos/jaked.webp";
import loftsails from "@/public/assets/img/brand-logos/loftsails.webp";
import mystic from "@/public/assets/img/brand-logos/mystic.webp";
import nomads from "@/public/assets/img/brand-logos/nomads.webp";
import oceanStorm from "@/public/assets/img/brand-logos/ocean-storm.webp";
import peterLynn from "@/public/assets/img/brand-logos/peter-lynn.webp";
import reflex from "@/public/assets/img/brand-logos/reflex.webp";
import ripcurl from "@/public/assets/img/brand-logos/ripcurl.webp";
import ryder from "@/public/assets/img/brand-logos/ryder.webp";
import softech from "@/public/assets/img/brand-logos/softech.webp";
import xcel from "@/public/assets/img/brand-logos/xcel.webp";
import surfica from "@/public/assets/img/brand-logos/surfica.webp";
import billabong from "@/public/assets/img/brand-logos/billabong.png";
import quiksilver from "@/public/assets/img/brand-logos/quicksilver.webp";
import roxy from "@/public/assets/img/brand-logos/roxy.webp";
import volcom from "@/public/assets/img/brand-logos/volcom.webp";
import rusty from "@/public/assets/img/brand-logos/rusty.webp";
import hurley from "@/public/assets/img/brand-logos/hurley.webp";
import vissla from "@/public/assets/img/brand-logos/vissla.webp";
import patagonia from "@/public/assets/img/brand-logos/patagonia.webp";
import rvca from "@/public/assets/img/brand-logos/rvca.webp";
import element from "@/public/assets/img/brand-logos/element.webp";
import oneill from "@/public/assets/img/brand-logos/oneill.webp";

import "./brands.scss";
import { useFilterItems } from "@/hooks/useFilterItems";

const brands: Brand[] = [
  {
    name: "Aipa",
    imageUrl: aipa.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Aipa"),
  },
  {
    name: "Dakine",
    imageUrl: dakine.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Dakine"),
  },
  {
    name: "Funkshen",
    imageUrl: funkshen.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Funkshen"),
  },
  {
    name: "GoPro",
    imageUrl: gopro.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("GoPro"),
  },
  {
    name: "Jaked",
    imageUrl: jaked.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Jaked"),
  },
  {
    name: "Loft Sails",
    imageUrl: loftsails.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Loft Sails"),
  },
  {
    name: "Mystic",
    imageUrl: mystic.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Mystic"),
  },
  {
    name: "Nomads",
    imageUrl: nomads.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Nomads"),
  },
  {
    name: "Ocean Storm",
    imageUrl: oceanStorm.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Ocean Storm"),
  },
  {
    name: "Peter Lynn",
    imageUrl: peterLynn.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Peter Lynn"),
  },
  {
    name: "Reflex",
    imageUrl: reflex.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Reflex"),
  },
  {
    name: "Rip Curl",
    imageUrl: ripcurl.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Rip Curl"),
  },
  {
    name: "Ryder",
    imageUrl: ryder.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Ryder"),
  },
  {
    name: "Softech",
    imageUrl: softech.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Softech"),
  },
  {
    name: "Surfica",
    imageUrl: surfica.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Surfica"),
  },
  {
    name: "Xcel",
    imageUrl: xcel.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Xcel"),
  },
  {
    name: "Billabong",
    imageUrl: billabong.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Billabong"),
  },
  {
    name: "Quiksilver",
    imageUrl: quiksilver.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Quiksilver"),
  },
  {
    name: "Roxy",
    imageUrl: roxy.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Roxy"),
  },
  {
    name: "Volcom",
    imageUrl: volcom.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Volcom"),
  },
  {
    name: "Rusty",
    imageUrl: rusty.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Rusty"),
  },
  {
    name: "Hurley",
    imageUrl: hurley.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Hurley"),
  },
  {
    name: "Vissla",
    imageUrl: vissla.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Vissla"),
  },
  {
    name: "Patagonia",
    imageUrl: patagonia.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Patagonia"),
  },
  {
    name: "RVCA",
    imageUrl: rvca.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("RVCA"),
  },
  {
    name: "Element",
    imageUrl: element.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("Element"),
  },
  {
    name: "O'Neill",
    imageUrl: oneill.src,
    redirectTo: "/all-products?search=" + encodeURIComponent("O'Neill"),
  },
];

const Brands: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    filteredItems: filteredBrands,
  } = useFilterItems<Brand>(brands, []);

  return (
    <div className="brands-container">
      <h1 className="title">All our Brands</h1>
      <SearchBar
        placeholder="Search a brand..."
        onChange={(query) => setSearchQuery(query)}
      />
      <div className="brands-grid">
        {filteredBrands.map((brand, index) => (
          <BrandCard key={index} brand={brand} />
        ))}
      </div>
    </div>
  );
};

export default Brands;
