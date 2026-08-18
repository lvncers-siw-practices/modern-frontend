import type { CartItem } from "../types/menu";

type CartPanelProps = {
  cartItems: CartItem[];
  onIncreaseQuantity: (id: number) => void;
  onDecreaseQuantity: (id: number) => void;
  onRemoveItem: (id: number) => void;
  onClearCart: () => void;
};

function CartPanel({
  cartItems,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearCart,
}: CartPanelProps) {
  const totalQuantity = cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity,
    0,
  );

  const totalPrice = cartItems.reduce(
    (total, cartItem) => total + cartItem.price * cartItem.quantity,
    0,
  );

  return (
    <aside className="cart-panel">
      <div className="cart-panel__header">
        <div>
          <p className="section-heading__label">ORDER</p>

          <h2>注文内容</h2>
        </div>

        <span className="cart-count">{totalQuantity}点</span>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">商品が追加されていません。</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((cartItem) => (
              <li className="cart-item" key={cartItem.id}>
                <div className="cart-item__main">
                  <div>
                    <p className="cart-item__name">{cartItem.name}</p>

                    <p className="cart-item__price">
                      {cartItem.price.toLocaleString()}円
                    </p>
                  </div>

                  <p className="cart-item__subtotal">
                    {(cartItem.price * cartItem.quantity).toLocaleString()}円
                  </p>
                </div>

                <div className="cart-item__actions">
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      type="button"
                      onClick={() => onDecreaseQuantity(cartItem.id)}
                    >
                      −
                    </button>

                    <span className="quantity">{cartItem.quantity}</span>

                    <button
                      className="quantity-button"
                      type="button"
                      onClick={() => onIncreaseQuantity(cartItem.id)}
                    >
                      ＋
                    </button>
                  </div>

                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => onRemoveItem(cartItem.id)}
                  >
                    削除
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <p className="cart-summary__row">
              <span>合計</span>

              <span className="cart-summary__total">
                {totalPrice.toLocaleString()}円
              </span>
            </p>

            <button
              className="clear-button"
              type="button"
              onClick={onClearCart}
            >
              注文内容をすべて削除
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default CartPanel;
