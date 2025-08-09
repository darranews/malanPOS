"use client";

import React, { useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/formatMoney";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface OrderItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface Order {
  id: string;
  items: OrderItem[];
  total: number;
}

interface PrintBillModalProps {
  open: boolean;
  onClose: () => void;
  order: Order;
}

export default function PrintBillModal({ open, onClose, order }: PrintBillModalProps) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!receiptRef.current) return;
    const canvas = await html2canvas(receiptRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [58, 200], // 58mm width
    });

    pdf.addImage(imgData, "PNG", 0, 0, 58, canvas.height * 0.264583); // px to mm
    pdf.save(`receipt-${order.id}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "MALAN POS Receipt",
          text: "Here is your receipt",
          url: `https://malanpos.com/order/${order.id}`,
        });
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      alert("Sharing not supported on this device");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Print Bill</DialogTitle>
        </DialogHeader>

        {/* CSS for 58mm printing */}
        <style>
          {`
            @media print {
              body {
                margin: 0;
                padding: 0;
              }
              .receipt {
                width: 58mm;
                font-family: monospace;
                font-size: 12px;
                color: black;
                background: white;
              }
              .receipt * {
                background: none !important;
                color: black !important;
              }
              .no-print {
                display: none !important;
              }
            }
          `}
        </style>

        {/* Receipt layout */}
        <div ref={receiptRef} className="receipt p-2">
          <h2 className="text-center font-bold text-base">MALAN POS</h2>
          <p className="text-center text-xs">123 Example Street, City</p>
          <p className="text-center text-xs">Phone: 0123-456-789</p>
          <p className="text-xs mt-2">Date: {new Date().toLocaleString()}</p>
          <hr className="my-1 border-black" />

          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between text-xs">
              <span>
                {item.name} x{item.qty}
              </span>
              <span>{formatMoney(item.price * item.qty)}</span>
            </div>
          ))}

          <hr className="my-1 border-black" />
          <div className="flex justify-between font-bold text-sm">
            <span>Total:</span>
            <span>{formatMoney(order.total)}</span>
          </div>

          {/* QR Code */}
          <div className="flex justify-center mt-2">
            <QRCodeSVG
              value={`https://malanpos.com/order/${order.id}`}
              size={80}
              includeMargin={true}
            />
          </div>

          <p className="text-center text-xs mt-2">Thank you & see you again!</p>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 mt-4 no-print">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="secondary" onClick={handleShare}>
            Share
          </Button>
          <Button variant="secondary" onClick={handleDownloadPDF}>
            PDF
          </Button>
          <Button onClick={handlePrint}>Print</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
