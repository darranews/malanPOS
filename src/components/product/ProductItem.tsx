'use client';
import type { Product } from "@/lib/types";

type ProductItemProps = {
  product: Product;
  onAddToOrder: (product: Product) => void;
  onEdit?: (product: Product, idx?: number) => void;
  onTouchStart?: (product: Product, idx?: number) => void;
  onTouchEnd?: () => void;
  idx?: number;
};

export default function ProductItem({
  product,
  onAddToOrder,
  onEdit,
  onTouchStart,
  onTouchEnd,
  idx,
}: ProductItemProps) {
  const handleRightClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (onEdit) onEdit(product, idx);
  };

  const imgSrc = `/images/products/${product.name.replace(/\s+/g, "").toLowerCase()}.png`;

  return (
    <div
      className="bg-white rounded-2xl shadow-md flex flex-col items-center p-3 cursor-pointer hover:shadow-lg transition select-none"
      onClick={() => onAddToOrder(product)}
      onContextMenu={handleRightClick}
      onTouchStart={e => onTouchStart && onTouchStart(product, idx)}
      onTouchEnd={e => onTouchEnd && onTouchEnd()}
    >
      <div className="w-full h-32 flex items-center justify-center mb-3">
        <img
          src={imgSrc}
          alt={product.name}
          className="object-cover w-full h-full rounded-xl shadow"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/images/products/default.png";
          }}
        />
      </div>
      <div className="text-sm text-gray-900 text-center">{product.name}</div>
      <div className="mt-2 text-xl font-bold text-gray-700 text-center">
        {Number(product.price).toFixed(2)}
      </div>
    </div>
  );
}
