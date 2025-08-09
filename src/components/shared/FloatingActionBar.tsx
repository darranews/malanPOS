'use client';

import { forwardRef } from "react";

const quickCashList = [5, 10, 20, 50, 100];

type FloatingActionBarProps = {
  total: number;
  cash: string;
  setCash: (cash: string) => void;
  onQuickCash: (amount: number) => void;
  change: number | string;
  onCancel: () => void;
  onPrintBill: () => void;
  order: any[];
};

const FloatingActionBar = forwardRef<HTMLDivElement, FloatingActionBarProps>(
  (
    {
      total,
      cash,
      setCash,
      onQuickCash,
      change,
      onCancel,
      onPrintBill,
      order,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className="absolute top-0 left-0 w-full max-w-full bg-white border-b rounded-t-xl shadow-lg z-20 px-2 md:px-6 py-5 overflow-x-auto"
      >
        {/* Tổng tiền */}
        <div className="border-b pb-2 mb-3">
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
              onClick={() => onQuickCash(q)}
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
    );
  }
);

export default FloatingActionBar;