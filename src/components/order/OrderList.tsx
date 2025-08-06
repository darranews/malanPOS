'use client';
import type { Order } from "@/lib/types";

type OrderListProps = {
  orders: Order[];
  onSelectOrder?: (order: Order) => void;
};

export default function OrderList({ orders, onSelectOrder }: OrderListProps) {
  return (
    <div>
      {orders.map((order) => (
        <div
          key={order.id}
          onClick={() => onSelectOrder?.(order)}
          className="p-4 border-b cursor-pointer hover:bg-gray-50"
        >
          <div className="font-semibold">Order #{order.id}</div>
          <div>Total: {order.total}</div>
          <div>Status: {order.status}</div>
          <div className="text-xs text-gray-500">{order.createdAt}</div>
        </div>
      ))}
    </div>
  );
}
