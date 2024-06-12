"use client";

import React from "react";
import { FaSearch } from "react-icons/fa";

import "./SearchBar.scss";

interface SearchBarProps {
  placeholder?: string;
  onChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search...",
  onChange,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        onChange={handleInputChange}
      />
      <button>
        <FaSearch />
      </button>
    </div>
  );
};

export default SearchBar;
