import { CartItemType } from "@/types/cart";

const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <li>
      {/* <img src={item.image} alt={item.name} width={50} />
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      <p>Quantity: {item.quantity}</p>
      <button onClick={() => dispatch(removeFromCart(item.id))}>Remove</button> */}
    </li>
  );
};

export default CartItem;
