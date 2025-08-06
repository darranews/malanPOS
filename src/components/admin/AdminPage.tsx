'use client';
import { useState } from "react";
import ProductManager from "@/components/admin/ProductManager";
import StockManager from "@/components/admin/StockManager";
import OrderManager from "@/components/admin/OrderManager";
import Report from "@/components/admin/Report";

const TABS = [
  { key: "product", label: "Product" },
  { key: "stock", label: "Stock" },
  { key: "order", label: "Order" },
  { key: "report", label: "Report" }
];

export default function AdminPage() {
  const [tab, setTab] = useState<string>("product");

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex gap-2 mb-4">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg font-semibold 
              ${tab === t.key ? "bg-primary text-white" : "bg-gray-100"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div>
        {tab === "product" && <ProductManager />}
        {tab === "stock" && <StockManager />}
        {tab === "order" && <OrderManager />}
        {tab === "report" && <Report />}
      </div>
    </div>
  );
}
