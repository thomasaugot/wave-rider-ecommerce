// this hook is for searches with typo (ex: you type "seurf" instead of "surf", you will still get the results)

"use client";

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { Product } from "@/types";

interface UseFuzzySearchOptions {
  keys: string[];
}

const useFuzzySearch = (
  items: Product[],
  initialQuery: string = "",
  options: UseFuzzySearchOptions
) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [filteredItems, setFilteredItems] = useState<Product[]>(items);
  const [fuse, setFuse] = useState<Fuse<Product> | null>(null);

  useEffect(() => {
    const fuseInstance = new Fuse(items, {
      keys: options.keys,
    });
    setFuse(fuseInstance);
  }, [items, options.keys]);

  useEffect(() => {
    if (fuse && query) {
      const results = fuse.search(query);
      setFilteredItems(results.map((result) => result.item));
    } else {
      setFilteredItems(items);
    }
  }, [fuse, query, items]);

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
  };

  return { filteredItems, handleSearch };
};

export default useFuzzySearch;
