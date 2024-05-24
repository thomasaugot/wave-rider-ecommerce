import { Product } from "@/types/product";
import { ProductCard } from "@/components/ProductCard/ProductCard";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={""}
          images={[]}
          name={""}
          description={""}
          price={0}
          addToCartButton={undefined}
        />
      ))}
    </div>
  );
};

export default ProductList;