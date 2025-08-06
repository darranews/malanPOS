// src/lib/types.ts

export type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
  category: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: "pending" | "completed" | "cancelled";
  note?: string;
};

export type User = {
  id: string;
  username: string;
  role: "admin" | "staff";
};
