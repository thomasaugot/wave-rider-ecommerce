import { categories } from "@/constants/categories";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";

import "./categories.scss";

export default function CategoriesPage() {
  return (
    <div className="categories-container">
      <h1 className="title">All Categories</h1>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <CategoryCard key={index} category={category} />
        ))}
      </div>
    </div>
  );
}
