import type { MenuItem } from "../types/menu";
import MenuCard from "./MenuCard";

type MenuListProps = {
  items: MenuItem[];
  onAddToCart: (item: MenuItem) => void;
};

function MenuList({ items, onAddToCart }: MenuListProps) {
  return (
    <div className="menu-grid">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

export default MenuList;
