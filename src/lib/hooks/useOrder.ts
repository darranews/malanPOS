// src/lib/hooks/useOrder.ts

import { useState } from "react";
import type { Order, OrderItem } from "../types";

export function useOrder() {
  const [order, setOrder] = useState<Order | null>(null);

  const addItem = (item: OrderItem) => {
    // Logic thêm sản phẩm vào đơn
  };

  const removeItem = (productId: string) => {
    // Logic xóa sản phẩm khỏi đơn
  };

  return {
    order,
    addItem,
    removeItem,
    // Thêm các action khác ở đây...
  };
}
