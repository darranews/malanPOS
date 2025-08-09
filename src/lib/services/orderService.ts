// src/lib/services/orderService.ts
import api from "./api";
import { Order } from "@/lib/types/order";

// Lấy danh sách đơn hàng
export const getOrders = async (): Promise<Order[]> => {
  const res = await api.get<Order[]>("/orders");
  return res.data;
};

// Lấy chi tiết 1 đơn hàng
export const getOrderById = async (id: string): Promise<Order> => {
  const res = await api.get<Order>(`/orders/${id}`);
  return res.data;
};

// Tạo đơn hàng mới
export const createOrder = async (order: Order): Promise<Order> => {
  const res = await api.post<Order>("/orders", order);
  return res.data;
};

// Cập nhật đơn hàng
export const updateOrder = async (
  id: string,
  order: Partial<Order>
): Promise<Order> => {
  const res = await api.put<Order>(`/orders/${id}`, order);
  return res.data;
};

// Xóa đơn hàng
export const deleteOrder = async (id: string): Promise<void> => {
  await api.delete(`/orders/${id}`);
};
