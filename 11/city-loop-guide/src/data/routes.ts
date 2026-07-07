export type Stop = {
  name: string;
  transfer?: string;
};

export type RouteInfo = {
  id: string;
  name: string;
  start: string;
  goal: string;
  description: string;
  stops: Stop[];
};

export const routes: RouteInfo[] = [
  {
    id: "blue-line",
    name: "ブルーライン",
    start: "中央駅",
    goal: "海浜公園駅",
    description: "中央駅から海浜公園駅を結ぶ、街の中心を通るライン。",
    stops: [
      { name: "中央駅", transfer: "オレンジライン" },
      { name: "市役所前駅" },
      { name: "文化センター駅", transfer: "グリーンライン" },
      { name: "海浜公園駅" },
    ],
  },
  {
    id: "green-line",
    name: "グリーンライン",
    start: "北駅",
    goal: "森林公園駅",
    description: "北駅から森林公園駅を結ぶ、大学や公園エリアを通るライン。",
    stops: [
      { name: "北駅" },
      { name: "文化センター駅", transfer: "ブルーライン" },
      { name: "大学前駅" },
      { name: "森林公園駅" },
    ],
  },
  {
    id: "orange-line",
    name: "オレンジライン",
    start: "空港駅",
    goal: "南ターミナル駅",
    description: "空港駅から南ターミナル駅を結ぶ、空の玄関口を通るライン。",
    stops: [
      { name: "空港駅" },
      { name: "商店街駅" },
      { name: "中央駅", transfer: "ブルーライン" },
      { name: "南ターミナル駅" },
    ],
  },
];
