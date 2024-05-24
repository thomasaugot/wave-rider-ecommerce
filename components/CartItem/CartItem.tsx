import { CartItem } from "@/types/cart";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";

const CartItem = ({ item }: { item: CartItem }) => {
  const dispatch = useDispatch();

  return (
    <li>
      <img src={item.image} alt={item.name} width={50} />
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
    </li>
  );
};

export default CartItem;
