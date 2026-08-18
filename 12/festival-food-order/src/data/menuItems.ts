import type { MenuItem } from "../types/menu";

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "焼きそば",
    description: "香ばしいソースで仕上げた定番メニューです。",
    price: 500,
    icon: "🍝",
  },
  {
    id: 2,
    name: "フランクフルト",
    description: "食べ応えのある大きなソーセージです。",
    price: 350,
    icon: "🌭",
  },
  {
    id: 3,
    name: "たこ焼き",
    description: "外は香ばしく、中はとろっとした6個入りです。",
    price: 450,
    icon: "🐙",
  },
  {
    id: 4,
    name: "クレープ",
    description: "クリームとフルーツを包んだ甘いデザートです。",
    price: 450,
    icon: "🍓",
  },
];
