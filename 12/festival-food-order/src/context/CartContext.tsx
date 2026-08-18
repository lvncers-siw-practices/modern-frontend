import { createContext, useContext, useState, type ReactNode } from "react";

import type { CartItem, MenuItem } from "../types/menu";

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: MenuItem) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
};

type CartProviderProps = {
  children: ReactNode;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem,
        );
      }

      return [
        ...currentItems,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem.id === id
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            }
          : cartItem,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setCartItems((currentItems) =>
      currentItems
        .map((cartItem) =>
          cartItem.id === id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem,
        )
        .filter((cartItem) => cartItem.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== id),
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCartはCartProviderの内側で使用してください。");
  }

  return context;
}
