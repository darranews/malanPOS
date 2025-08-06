'use client';
import type { Order } from "@/lib/types";
import { formatMoney } from "@/lib/utils/formatMoney";

type OrderSummaryProps = {
  order: Order;
};

export default function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="p-4 border rounded bg-gray-50">
      <div className="font-bold mb-2">Order Summary</div>
      <div>
        {order.items.map((item) => (
          <div key={item.productId} className="flex justify-between">
            <div>
              {item.name} x {item.quantity}
            </div>
            <div>{formatMoney(item.price * item.quantity)}</div>
          </div>
        ))}
      </div>
      <div className="font-bold text-right mt-4">
        Total: {formatMoney(order.total)}
      </div>
    </div>
  );
}
