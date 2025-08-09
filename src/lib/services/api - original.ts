// src/lib/api.ts

import type { Product, Order } from "./types";

// Fake API, sau này thay bằng gọi fetch tới backend thật
export const fetchProducts = async (): Promise<Product[]> => {
  // Gọi tới API thật hoặc trả về mock data
  return [];
};

export const fetchOrders = async (): Promise<Order[]> => {
  return [];
};

// Thêm các function gọi API khác ở đây...
