"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ProductManager } from "@/components/admin/ProductManager";
import { StockManager } from "@/components/admin/StockManager";
import { OrderManager } from "@/components/admin/OrderManager";
import { Report } from "@/components/admin/Report";

export default function AdminPage() {
  return (
    <div className="flex flex-col h-full p-4">
      <Card className="flex-1 p-4">
        <Tabs defaultValue="products" className="h-full flex flex-col">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="products">Sản phẩm</TabsTrigger>
            <TabsTrigger value="stock">Tồn kho</TabsTrigger>
            <TabsTrigger value="orders">Đơn hàng</TabsTrigger>
            <TabsTrigger value="reports">Báo cáo</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="flex-1 overflow-auto">
            <ProductManager />
          </TabsContent>

          <TabsContent value="stock" className="flex-1 overflow-auto">
            <StockManager />
          </TabsContent>

          <TabsContent value="orders" className="flex-1 overflow-auto">
            <OrderManager />
          </TabsContent>

          <TabsContent value="reports" className="flex-1 overflow-auto">
            <Report />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
