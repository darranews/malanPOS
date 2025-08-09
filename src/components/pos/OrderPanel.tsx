import React from "react";
import OrderItemList from "./OrderItemList";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/formatMoney";

interface OrderPanelProps {
  cart?: { product: { name: string; price: number }; quantity: number }[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onRemoveItem: (index: number) => void;
  onQuantityChange: (index: number, delta: number) => void;
  onCheckout: () => void;
}

const OrderPanel: React.FC<OrderPanelProps> = ({
  cart = [],
  selectedIndex,
  onSelectIndex,
  onRemoveItem,
  onQuantityChange,
  onCheckout,
}) => {
  const total = (cart ?? []).reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col h-full border-l border-border">
      <div className="flex-1 overflow-y-auto">
        <OrderItemList
          items={(cart ?? []).map((c) => ({
            name: c.product.name,
            price: c.product.price,
            quantity: c.quantity,
          }))}
          selectedIndex={selectedIndex}
          onSelectIndex={onSelectIndex}
          onRemoveItem={onRemoveItem}
          onQuantityChange={onQuantityChange}
        />
      </div>
      <div className="p-4 border-t border-border">
        <div className="flex justify-between mb-2">
          <span className="font-semibold">Tổng cộng:</span>
          <span className="font-bold">{formatMoney(total)}</span>
        </div>
        <Button className="w-full" onClick={onCheckout} disabled={(cart ?? []).length === 0}>
          Thanh toán
        </Button>
      </div>
    </div>
  );
};

export default OrderPanel;
