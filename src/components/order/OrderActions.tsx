'use client';

type OrderActionsProps = {
  onCancel: () => void;
  onPrintBill: () => void;
  order: any[]; // Có thể định nghĩa type cụ thể hơn
};

export default function OrderActions({ onCancel, onPrintBill, order }: OrderActionsProps) {
  return (
    <div className="flex gap-3">
      <button
        className="flex-1 border text-red-600 py-2 rounded hover:bg-gray-100"
        onClick={onCancel}
        type="button"
      >
        Cancel
      </button>
      <button
        className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        onClick={onPrintBill}
        type="button"
        disabled={!order.length}
      >
        Print Bill
      </button>
    </div>
  );
}
