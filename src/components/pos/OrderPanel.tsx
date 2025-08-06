'use client';

import { useRef, useEffect, useState } from "react";
import OrderItemList from "@/components/pos/OrderItemList";

type OrderPanelProps = {
  order: any[];
  onIncrease: (id: any) => void;
  onDecrease: (id: any) => void;
  onRemove: (id: any) => void;
  onCancel: () => void;
  logs?: any[];
  total: number;
  onPrintBill: () => void;
  onScan?: (barcode: string) => void; // callback xử lý scan
};

export default function OrderPanel({
  order,
  onIncrease,
  onDecrease,
  onRemove,
  onCancel,
  logs,
  total,
  onPrintBill,
  onScan,
}: OrderPanelProps) {
  const [cash, setCash] = useState("");
  const [scanValue, setScanValue] = useState("");
  const scanInputRef = useRef<HTMLInputElement>(null);
  const quickCashList = [5, 10, 20, 50, 100];

  // Focus lại ô scan khi bấm Space (ngoài input/textarea)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (e.code === "Space" && tag !== "input" && tag !== "textarea") {
        e.preventDefault();
        scanInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Khi scan xong (bấm Enter), gọi callback và focus lại
  const handleScanEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && scanValue.trim()) {
      onScan?.(scanValue.trim());
      setScanValue("");
      setTimeout(() => scanInputRef.current?.focus(), 100);
    }
  };

  const handleQuickCash = (val: number) =>
    setCash((cash) => (parseFloat(cash || "0") + val).toFixed(2));
  const change = cash !== "" && !isNaN(Number(cash)) ? Number(cash) - total : "";

  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-sm">
      {/* Ô scan nằm trên order list */}
      <div className="px-4 md:px-6 pt-2 pb-1">
        <input
          ref={scanInputRef}
          type="text"
          placeholder="Scan or enter item code..."
          className="w-full border rounded px-3 py-2 text-base"
          value={scanValue}
          onChange={e => setScanValue(e.target.value)}
          onKeyDown={handleScanEnter}
          autoFocus
        />
        <div className="text-xs text-gray-400 mt-1">
          Press <b>Space</b> to focus this field
        </div>
      </div>

      {/* List Order (tối đa 10 món, có scrollbar nếu nhiều hơn) */}
      <div className="flex-1 min-h-0 overflow-y-auto max-h-[480px] p-4 md:p-6 pt-0">
        <OrderItemList
          order={order}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onRemove={onRemove}
          limit={10} // Nếu muốn giới hạn 10 item
        />
      </div>

      {/* Action Bar phía dưới (luôn hiển thị, không float) */}
      <div className="w-full bg-white border-t rounded-b-xl shadow-sm px-2 md:px-6 py-5">
        {/* Tổng tiền - KHÔNG có border phía trên */}
        <div className="mb-3">
          <div className="flex justify-between text-base md:text-lg font-bold gap-3">
            <span>Total</span>
            <span>{isNaN(total) ? "0.00" : Number(total).toFixed(2)}</span>
          </div>
        </div>
        {/* Quick cash & input */}
        <div className="flex flex-wrap items-end mt-3 gap-2 md:gap-3">
          <input
            type="number"
            placeholder="Cash receive"
            className="w-28 md:w-36 border rounded px-2 md:px-3 py-2 text-base md:text-lg font-medium text-right"
            value={cash}
            min="0"
            onChange={e => setCash(e.target.value.replace(/[^\d.]/g, ""))}
          />
          {quickCashList.map(q => (
            <button
              key={q}
              className="px-2 md:px-3 py-2 rounded border text-green-700 bg-green-50 hover:bg-green-100 font-semibold text-sm md:text-base min-w-[44px]"
              onClick={() => handleQuickCash(q)}
              type="button"
            >
              +{q}
            </button>
          ))}
          <div className="ml-auto text-base font-semibold truncate">
            Change:&nbsp;
            <span className={Number(change) >= 0 ? "text-green-700" : "text-red-600"}>
              {change !== "" ? Number(change).toFixed(2) : "-"}
            </span>
          </div>
        </div>
        {/* Nút hành động */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-5">
          <button
            className="flex-1 min-w-[120px] border text-red-600 py-3 rounded hover:bg-gray-100 font-semibold"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex-1 min-w-[120px] bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:opacity-50 font-semibold"
            onClick={onPrintBill}
            type="button"
            disabled={!order || order.length === 0 || total === 0}
          >
            Print Bill
          </button>
        </div>
      </div>
    </div>
  );
}
