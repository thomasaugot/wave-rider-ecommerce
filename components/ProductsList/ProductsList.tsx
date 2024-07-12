import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";

import "ProductList.scss";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div className="product-list__container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          images={[]}
          name={""}
          description={""}
          price={0}
        />
      ))}
    </div>
  );
};

export default ProductList;
