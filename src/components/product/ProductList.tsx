import React from "react";
import ProductItem from "./ProductItem";

const gridColsClass = {
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
  5: "grid-cols-5",
  6: "grid-cols-6",
  8: "grid-cols-8",
};

export default function ProductList({ products, onAddToOrder, onEdit, onTouchStart, onTouchEnd, cols = 4 }) {
  const gridClass = gridColsClass[cols] || "grid-cols-4";
  return (
    <div className={`grid ${gridClass} gap-4`}>
      {products.map((product, idx) => (
        <ProductItem
          key={product.id}
          product={product}
          idx={idx}
          onAddToOrder={onAddToOrder}
          onEdit={onEdit}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        />
      ))}
    </div>
  );
}
