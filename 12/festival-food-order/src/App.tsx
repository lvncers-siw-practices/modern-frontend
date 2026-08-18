import { useState } from "react";
import CartPanel from "./components/CartPanel";
import MenuList from "./components/MenuList";
import { menuItems } from "./data/menuItems";
import type { CartItem, MenuItem } from "./types/menu";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (item: MenuItem) => {
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

  const handleIncreaseQuantity = (id: number) => {
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

  const handleDecreaseQuantity = (id: number) => {
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

  const handleRemoveItem = (id: number) => {
    setCartItems((currentItems) =>
      currentItems.filter((cartItem) => cartItem.id !== id),
    );
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="app">
      <header className="app-header">
        <p className="app-header__label">SCHOOL FESTIVAL 2026</p>

        <h1>学園祭フード注文</h1>

        <p>食べたいメニューを選択し、現在の注文内容を確認できます。</p>
      </header>

      <main className="app-main">
        <section className="menu-section">
          <div className="section-heading">
            <div>
              <p className="section-heading__label">MENU</p>

              <h2>フードメニュー</h2>
            </div>
          </div>

          <MenuList items={menuItems} onAddToCart={handleAddToCart} />
        </section>

        <CartPanel
          cartItems={cartItems}
          onIncreaseQuantity={handleIncreaseQuantity}
          onDecreaseQuantity={handleDecreaseQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      </main>
    </div>
  );
}

export default App;
