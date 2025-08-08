// src/lib/types/order.ts
import type { Product } from "./product";

export interface OrderItem {
  productId: number | string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface Order {
  id: number | string;
  items: OrderItem[];
  total: number;
  status: "pending" | "completed" | "cancelled";
  createdAt: string; // ISO date
}
