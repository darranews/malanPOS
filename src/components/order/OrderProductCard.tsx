'use client';
import type { OrderItem } from "@/lib/types";

type OrderProductCardProps = {
  item: OrderItem;
  onRemove?: () => void;
};

export default function OrderProductCard({ item, onRemove }: OrderProductCardProps) {
  return (
    <div className="flex items-center gap-3 p-2 border rounded mb-2">
      <img src={item.image || ""} alt={item.name} className="w-10 h-10 rounded" />
      <div className="flex-1">
        <div className="font-semibold">{item.name}</div>
        <div className="text-xs text-gray-500">x{item.quantity}</div>
      </div>
      <div>{item.price}₫</div>
      {onRemove && (
        <button onClick={onRemove} className="text-red-500 text-xs">Remove</button>
      )}
    </div>
  );
}
