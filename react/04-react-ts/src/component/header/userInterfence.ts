export type UserInfo = {
  name: string;
  age: number;
};

export type Menu = {
  title: string;
  price: number;
  isChecked: boolean;
  items: Array<{
    name: string;
    price: number;
  }>;
};
