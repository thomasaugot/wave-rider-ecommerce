"use client";

import { useState, ChangeEvent } from "react";

const useSearchBar = (initialValue = "", onChange: (query: string) => void) => {
  const [query, setQuery] = useState(initialValue);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setQuery(newValue);
    onChange(newValue);
  };

  return {
    query,
    handleInputChange,
  };
};

export default useSearchBar;
