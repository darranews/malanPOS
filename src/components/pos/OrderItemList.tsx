'use client';

type OrderItemListProps = {
  order: any[];
  onIncrease: (id: any) => void;
  onDecrease: (id: any) => void;
  onRemove: (id: any) => void;
  limit?: number;
};

export default function OrderItemList({
  order,
  onIncrease,
  onDecrease,
  onRemove,
  limit,
}: OrderItemListProps) {
  const items = limit ? order.slice(0, limit) : order;

  return (
    <div>
      {items.length === 0 && (
        <div className="text-center text-gray-400 mt-8">No items in order.</div>
      )}
      {items.map((item: any) => (
        <div
          key={item.id}
          className="flex items-center py-3 px-2 rounded-lg hover:bg-gray-50 transition"
          // KHÔNG border, border-b, border-t ở đây!
        >
          <div className="flex-1">
            <div className="font-semibold">{item.name}</div>
            <div className="text-xs text-gray-400">
              Price: {item.price?.toFixed(2)} × Qty: {item.qty}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => onDecrease(item.id)}
              type="button"
            >-</button>
            <span className="px-2">{item.qty}</span>
            <button
              className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300"
              onClick={() => onIncrease(item.id)}
              type="button"
            >+</button>
          </div>
          <button
            className="ml-4 text-red-500 hover:text-red-700 font-bold px-2"
            onClick={() => onRemove(item.id)}
            type="button"
            title="Remove"
          >×</button>
        </div>
      ))}
    </div>
  );
}
