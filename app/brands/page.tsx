"use client";

import React from "react";
import { BrandCard } from "@/components/BrandCard/BrandCard";
import SearchBar from "@/components/SearchBar/SearchBar";
import { Brand } from "@/types";
import { brands } from "@/constants/brands";
import { useFilterItems } from "@/hooks/useFilterItems";

import "./brands.scss";

export default function Brands() {
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
}
