import { useState } from "react";
import { getOrders, createNewOrder } from "@/lib/services/orderService";
import { Order, OrderItem } from "@/lib/types/order";

export function useOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getOrders();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (items: OrderItem[]) => {
    try {
      const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
      const orderData: Partial<Order> = {
        items,
        total,
        createdAt: new Date().toISOString(),
        status: "pending",
      };
      const newOrder = await createNewOrder(orderData);
      setOrders(prev => [...prev, newOrder]);
      return newOrder;
    } catch (err: any) {
      setError(err.message || "Failed to create order");
      throw err;
    }
  };

  return {
    orders,
    loading,
    error,
    fetchOrders,
    createOrder,
  };
}
