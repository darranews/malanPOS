'use client';
import { useState } from "react";
import OrderList from "@/components/order/OrderList";
import type { Order } from "@/lib/types";

const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    items: [],
    total: 100_000,
    createdAt: "2025-08-06 09:00",
    status: "completed",
  },
  {
    id: "2",
    items: [],
    total: 230_000,
    createdAt: "2025-08-06 09:05",
    status: "pending",
  },
];

export default function OrderPage() {
  const [orders] = useState<Order[]>(MOCK_ORDERS);
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <div className="p-6">
      <h1 className="font-bold text-lg mb-4">Order List</h1>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <OrderList orders={orders} onSelectOrder={setSelected} />
        </div>
        <div>
          {selected ? (
            <div className="p-4 border rounded">
              <div className="font-semibold">Order #{selected.id}</div>
              <div>Total: {selected.total}</div>
              <div>Status: {selected.status}</div>
              <div className="text-xs text-gray-500">{selected.createdAt}</div>
              {/* Hiển thị detail order, items... */}
            </div>
          ) : (
            <div className="text-gray-400">Select an order to view details</div>
          )}
        </div>
      </div>
    </div>
  );
}
