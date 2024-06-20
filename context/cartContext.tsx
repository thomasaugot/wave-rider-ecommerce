"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

interface CartAction {
  type: "ADD_ITEM" | "REMOVE_ITEM" | "SET_CART";
  payload: CartItem[] | CartItem;
}

const CartContext = createContext<{
  cartState: CartState;
  dispatch: React.Dispatch<CartAction>;
}>({
  cartState: { items: [], totalAmount: 0 },
  dispatch: () => null,
});

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const updatedTotalAmount =
        state.totalAmount +
        (action.payload as CartItem).price *
          (action.payload as CartItem).quantity;
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === (action.payload as CartItem).id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      let updatedItems;

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity:
            existingCartItem.quantity + (action.payload as CartItem).quantity,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.payload as CartItem);
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "REMOVE_ITEM": {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === (action.payload as CartItem).id
      );
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.totalAmount - existingCartItem.price;
      let updatedItems;

      if (existingCartItem.quantity === 1) {
        updatedItems = state.items.filter(
          (item) => item.id !== (action.payload as CartItem).id
        );
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { items: updatedItems, totalAmount: updatedTotalAmount };
    }
    case "SET_CART": {
      const newCartItems = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      const newTotalAmount = newCartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      return { items: newCartItems, totalAmount: newTotalAmount };
    }
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartState, dispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  useEffect(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      const parsedCartItems = JSON.parse(savedCartItems);
      dispatch({ type: "SET_CART", payload: parsedCartItems });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartState.items));
  }, [cartState.items]);

  return (
    <CartContext.Provider value={{ cartState, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
