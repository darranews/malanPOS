'use client';
import React from "react";
import type { Product } from "@/lib/types";

type ProductItemProps = {
  product: Product;
  onAddToOrder: (product: Product) => void;
  onEdit?: (product: Product, idx?: number) => void;
  onTouchStart?: (product: Product, idx?: number) => void;
  onTouchEnd?: () => void;
  idx?: number;
  className?: string;
};

export default function ProductItem({
  product,
  onAddToOrder,
  onEdit,
  onTouchStart,
  onTouchEnd,
  idx,
  className = "",
}: ProductItemProps) {
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onEdit) onEdit(product, idx);
  };

  const imgSrc =
    product.image && product.image.trim() !== ""
      ? product.image
      : "/images/default.jpg";

  return (
    <div
      className={`p-2 border rounded cursor-pointer hover:bg-gray-100 ${className}`}
      onClick={() => onAddToOrder(product)}
      onContextMenu={handleRightClick}
      onTouchStart={() => onTouchStart && onTouchStart(product, idx)}
      onTouchEnd={onTouchEnd}
    >
      <img
        src={imgSrc}
        alt={product.name}
        className="w-full h-24 object-cover rounded"
      />
      <div className="mt-2 text-sm font-semibold">{product.name}</div>
      <div className="text-xs text-gray-500">
        ${product.price.toFixed(2)} AUD
      </div>
    </div>
  );
}
