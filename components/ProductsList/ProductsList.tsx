import { Product } from "../../types/product";
import { ProductItem } from "../ProductItem/ProductItem";

const ProductList = ({ products }: { products: Product[] }) => {
  return (
    <div>
      {products.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
