'use client';
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  onClick?: () => void;
  onRightClick?: () => void;
  onTouchStart?: () => void;
  onTouchEnd?: () => void;
};

export default function ProductCard({
  product,
  onClick,
  onRightClick,
  onTouchStart,
  onTouchEnd,
}: ProductCardProps) {
  return (
    <div
      className="border border-green-300 rounded-lg p-2 flex items-center cursor-pointer transition hover:shadow-md"
      onClick={onClick}
      onContextMenu={e => {
        e.preventDefault();
        onRightClick && onRightClick();
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ minHeight: 90 }}
    >
      <img
        src={product.image || "/images/no-image.png"}
        alt={product.name}
        className="w-16 h-16 object-contain rounded mr-4 bg-white"
        style={{ flexShrink: 0 }}
      />
      <div className="flex flex-col flex-1">
        <h4 className="font-semibold text-base">{product.name}</h4>
        <p className="text-sm text-gray-500 mt-1">${Number(product.price).toFixed(2)}</p>
        <span className="text-xs text-green-500">Stock: {product.stock || 0}</span>
      </div>
    </div>
  );
}
