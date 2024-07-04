"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";
import useSearchBar from "@/hooks/useSearchBar";

import "./SearchBar.scss";

interface SearchBarProps {
  placeholder?: string;
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  const { query, handleInputChange } = useSearchBar("", onChange);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
      />
      <button>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
