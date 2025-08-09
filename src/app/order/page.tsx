"use client";

import { Card } from "@/components/ui/card";
import { OrderList } from "@/components/order/OrderList";
import { OrderSummary } from "@/components/order/OrderSummary";
import { useOrders } from "@/lib/hooks/useOrders";
import { useState } from "react";
import { OrderActions } from "@/components/order/OrderActions";
import { OrderProductCard } from "@/components/order/OrderProductCard";
import { Dialog } from "@/components/ui/dialog";

export default function OrderPage() {
  const { orders, loading } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  return (
    <div className="flex flex-col h-full p-4">
      <Card className="flex-1 p-4 overflow-auto">
        <OrderList
          orders={orders}
          loading={loading}
          onSelect={(order) => setSelectedOrder(order)}
        />
      </Card>

      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">
              Đơn #{selectedOrder.id}
            </h2>
            <div className="space-y-2">
              {selectedOrder.items.map((item: any) => (
                <OrderProductCard key={item.id} product={item} />
              ))}
            </div>
            <OrderSummary total={selectedOrder.total} />
            <OrderActions order={selectedOrder} />
          </div>
        )}
      </Dialog>
    </div>
  );
}
