import React from "react";
import { OrderItem } from "@/lib/types/order";
import { formatMoney } from "@/lib/utils/formatMoney";
import { Trash2 } from "lucide-react";

interface OrderItemListProps {
  items: { name: string; quantity: number; price: number }[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onQuantityChange: (index: number, delta: number) => void;
}

export const OrderItemList: React.FC<OrderItemListProps> = ({
  items,
  selectedIndex,
  onSelectIndex,
  onRemoveItem,
  onQuantityChange,
}) => {
  return (
    <div className="flex flex-col divide-y divide-border overflow-y-auto">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onSelectIndex(index)}
          className={`flex items-center justify-between p-2 cursor-pointer ${
            selectedIndex === index ? "bg-accent" : ""
          }`}
        >
          <div className="flex flex-col">
            <span>{item.name}</span>
            <span className="text-sm text-muted-foreground">
              {formatMoney(item.price)} × {item.quantity}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>{formatMoney(item.price * item.quantity)}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(index, -1);
              }}
              className="px-2 bg-gray-200 rounded"
            >
              -
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onQuantityChange(index, 1);
              }}
              className="px-2 bg-gray-200 rounded"
            >
              +
            </button>
            <Trash2
              className="cursor-pointer text-red-500"
              onClick={(e) => {
                e.stopPropagation();
                onRemoveItem(index);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

// ✅ Default export để page.tsx import không lỗi
export default OrderItemList;