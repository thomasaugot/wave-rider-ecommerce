import { useState, useEffect } from "react";

interface FilterableItem {
  name: string;
}

export const useFilterItems = <T extends FilterableItem>(
  items: T[],
  initialItems: T[]
) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<T[]>(initialItems);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [searchQuery, items]);

  return { searchQuery, setSearchQuery, filteredItems };
};
