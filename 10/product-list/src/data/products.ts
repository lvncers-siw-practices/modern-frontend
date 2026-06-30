import type { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "ノートPC",
    price: 120000,
    category: "PC",
    description: "持ち運びしやすい軽量ノートパソコンです。",
    isRecommended: true,
  },
  {
    id: 2,
    name: "ゲーミングPC",
    price: 198000,
    category: "PC",
    description: "高性能なグラフィックボードを搭載しています。",
    isRecommended: false,
  },
  {
    id: 3,
    name: "スマートフォン",
    price: 98000,
    category: "スマホ",
    description: "高性能カメラを搭載した人気モデルです。",
    isRecommended: true,
  },
  {
    id: 4,
    name: "ワイヤレスイヤホン",
    price: 14800,
    category: "周辺機器",
    description: "ノイズキャンセリング機能付きのイヤホンです。",
    isRecommended: false,
  },
  {
    id: 5,
    name: "液晶モニター",
    price: 32800,
    category: "周辺機器",
    description: "作業しやすい27インチのモニターです。",
    isRecommended: true,
  },
];
