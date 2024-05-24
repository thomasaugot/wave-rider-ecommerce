import { Product } from "../../types/product";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/slices/cartSlice";
import { ProductCard } from "../ProductCard/ProductCard";

export const ProductItem = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();

  const addToCartButton = (
    <button onClick={() => dispatch(addToCart(product))}>Add to Cart</button>
  );

  return (
    <ProductCard
      id={product.id.toString()}
      images={product.images}
      name={product.name}
      description={product.description}
      price={product.price}
      addToCartButton={addToCartButton}
    />
  );
};
