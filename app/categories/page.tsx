import surf from "@/public/assets/img/surfer-canarias.webp";
import kitesurf from "@/public/assets/img/kitesurf.webp";
import windsurf from "@/public/assets/img/windsurf.webp";
import paddleboard from "@/public/assets/img/paddle.webp";
import bodyboard from "@/public/assets/img/bodyboarder.webp";
import wingfoil from "@/public/assets/img/windfoil.webp";
import kayaking from "@/public/assets/img/kayaking.webp";
import canoeing from "@/public/assets/img/canoeing.webp";
import scubaDiving from "@/public/assets/img/scubaDiving.webp";
import snorkeling from "@/public/assets/img/snorkeling.webp";
import sailing from "@/public/assets/img/sailing.webp";
import wakeboarding from "@/public/assets/img/wakeboarding.webp";
import waterSkiing from "@/public/assets/img/waterskiing.webp";
import rafting from "@/public/assets/img/rafting.webp";
import { Category } from "@/types";
import "./categories.scss";
import { CategoryCard } from "@/components/CategoryCard/CategoryCard";

const categories: Category[] = [
  {
    name: "Surf",
    imageUrl: surf.src,
    redirectTo: "/categories/surf",
  },
  {
    name: "Kitesurf",
    imageUrl: kitesurf.src,
    redirectTo: "/categories/kitesurf",
  },
  {
    name: "Windsurf",
    imageUrl: windsurf.src,
    redirectTo: "/categories/windsurf",
  },
  {
    name: "Paddleboard",
    imageUrl: paddleboard.src,
    redirectTo: "/categories/paddleboard",
  },
  {
    name: "Bodyboard",
    imageUrl: bodyboard.src,
    redirectTo: "/categories/bodyboard",
  },
  {
    name: "Wingfoil",
    imageUrl: wingfoil.src,
    redirectTo: "/categories/wingfoil",
  },
  {
    name: "Kayaking",
    imageUrl: kayaking.src,
    redirectTo: "/categories/kayaking",
  },
  {
    name: "Canoeing",
    imageUrl: canoeing.src,
    redirectTo: "/categories/canoeing",
  },
  {
    name: "Scuba Diving",
    imageUrl: scubaDiving.src,
    redirectTo: "/categories/scuba-diving",
  },
  {
    name: "Snorkeling",
    imageUrl: snorkeling.src,
    redirectTo: "/categories/snorkeling",
  },
  {
    name: "Sailing",
    imageUrl: sailing.src,
    redirectTo: "/categories/sailing",
  },
  {
    name: "Wakeboarding",
    imageUrl: wakeboarding.src,
    redirectTo: "/categories/wakeboarding",
  },
  {
    name: "Water Skiing",
    imageUrl: waterSkiing.src,
    redirectTo: "/categories/water-skiing",
  },
  {
    name: "Rafting",
    imageUrl: rafting.src,
    redirectTo: "/categories/rafting",
  },
];

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
