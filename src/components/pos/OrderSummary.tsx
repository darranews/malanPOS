'use client';

type OrderSummaryProps = {
  total: number;
};

export default function OrderSummary({ total }: OrderSummaryProps) {
  return (
    <div className="border-t pt-4 mb-4">
      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span>{Number(total).toFixed(2)}</span>
      </div>
      {/* Nếu sau này có thuế/chiết khấu thì thêm ở đây */}
    </div>
  );
}
