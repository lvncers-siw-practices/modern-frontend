import type { MenuItem } from "../types/menu";

type MenuCardProps = {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
};

function MenuCard({ item, onAddToCart }: MenuCardProps) {
  return (
    <article className="menu-card">
      <div className="menu-card__top">
        <span className="menu-card__icon">{item.icon}</span>

        <div>
          <h3 className="menu-card__name">{item.name}</h3>
        </div>
      </div>

      <p className="menu-card__description">{item.description}</p>

      <div className="menu-card__footer">
        <p className="menu-card__price">{item.price.toLocaleString()}円</p>

        <button
          className="add-button"
          type="button"
          onClick={() => onAddToCart(item)}
        >
          注文に追加
        </button>
      </div>
    </article>
  );
}

export default MenuCard;
