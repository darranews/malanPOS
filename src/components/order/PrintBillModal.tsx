'use client';

type PrintBillModalProps = {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
};

export default function PrintBillModal({
  isOpen,
  onClose,
  orderId,
}: PrintBillModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <div className="font-bold mb-4">Print Bill</div>
        <div className="mb-4">Order ID: {orderId}</div>
        <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
}
