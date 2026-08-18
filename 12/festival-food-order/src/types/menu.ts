export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  icon: string;
};

export type CartItem = MenuItem & {
  quantity: number;
};
