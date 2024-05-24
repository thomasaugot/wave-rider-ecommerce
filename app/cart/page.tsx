import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import CartItem from "@/components/CartItem/CartItem";
import { clearCart } from "@/lib/features/slices/cartSlice";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  if (cart.length === 0) {
    return <p>Your cart is empty</p>;
  }

  return (
    <div>
      <h1>Your Shopping Cart</h1>
      <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
      <ul>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
