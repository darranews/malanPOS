"use client";

import { useEffect, useState, useRef } from "react";
import { formatMoney } from "@/lib/utils/formatMoney";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Plus, Share2, FileDown } from "lucide-react";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/${params.id}`)
      .then((res) => res.json())
      .then(setOrder)
      .catch(() => setOrder(null));
  }, [params.id]);

  const downloadPDF = async () => {
    if (!printRef.current) return;
    const canvas = await html2canvas(printRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [58, 200], // Khổ 58mm
    });
    pdf.addImage(imgData, "PNG", 0, 0, 58, 0);
    pdf.save(`invoice-${order.id}.pdf`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Hóa đơn #${order.id} - MalanPOS`,
          text: "Xem chi tiết hóa đơn của bạn tại đây:",
          url: `${window.location.origin}/order/${order.id}`,
        })
        .catch((err) => console.log("Share canceled", err));
    } else {
      alert("Trình duyệt không hỗ trợ chia sẻ trực tiếp");
    }
  };

  if (!order) {
    return (
      <div className="p-4 text-center">
        <p>Đang tải hóa đơn...</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-2 bg-gray-100 min-h-screen">
      {/* Nội dung hóa đơn - 58mm */}
      <div
        ref={printRef}
        className="bg-white w-full max-w-[230px] p-4 rounded shadow text-sm"
      >
        {/* Logo */}
        <img
          src="/images/logo.png"
          alt="MalanPOS Logo"
          className="w-16 mx-auto mb-2"
        />

        <h1 className="text-lg font-bold text-center">Hóa đơn #{order.id}</h1>
        <p className="text-center text-gray-500">
          Ngày: {new Date(order.createdAt).toLocaleString()}
        </p>
        <p className="text-center text-gray-500">
          NV: {order.staffName || "Không xác định"}
        </p>

        {/* Bảng sản phẩm */}
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-1 text-left">Sản phẩm</th>
              <th className="py-1">SL</th>
              <th className="py-1 text-right">Giá</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item: any) => (
              <tr key={item.id} className="border-b">
                <td className="py-1">{item.name}</td>
                <td className="py-1 text-center">{item.quantity}</td>
                <td className="py-1 text-right">
                  {formatMoney(item.price * item.quantity)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="py-1 font-bold">
                Tổng
              </td>
              <td className="py-1 text-right font-bold">
                {formatMoney(order.total)}
              </td>
            </tr>
          </tfoot>
        </table>

        <p className="text-center mt-4">Cảm ơn quý khách!</p>
      </div>

      {/* Floating Action Menu */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-2">
        {menuOpen && (
          <>
            <button
              onClick={downloadPDF}
              className="bg-primary text-white p-3 rounded-full shadow hover:opacity-90 flex items-center justify-center"
            >
              <FileDown size={20} />
            </button>
            <button
              onClick={handleShare}
              className="bg-green-600 text-white p-3 rounded-full shadow hover:opacity-90 flex items-center justify-center"
            >
              <Share2 size={20} />
            </button>
          </>
        )}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="bg-purple-600 text-white p-4 rounded-full shadow hover:opacity-90"
        >
          <Plus size={24} />
        </button>
      </div>
    </div>
  );
}
