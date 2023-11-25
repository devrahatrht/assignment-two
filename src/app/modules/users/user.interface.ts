export type Order = {
  productName: string;
  price: number;
  quantity: number;
};

export type FullName = {
  firstName: string;
  lastName: string;
};

export type Address = {
  street: string;
  city: string;
  country: string;
};

export type User = {
  userId: number;
  userName: string;
  password: string;
  fullName: FullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: Address;
  orders?: Order[];
  isDeleted: boolean;
};
