"use client";

import { useEffect, useMemo, useState } from "react";
import ProductItem from "@/components/product/ProductItem";
import { Product } from "@/lib/types/product";

interface ProductListProps {
  products: Product[];
  onAddToOrder: (product: Product) => void;
  search?: string; // Thêm mới để nhận từ ProductSearch
}

export default function ProductList({
  products,
  onAddToOrder,
  search = "",
}: ProductListProps) {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Giữ nguyên logic cũ nhưng thêm lọc theo search/barcode
  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p) => {
      if (!search) return true;
      const lowerSearch = search.toLowerCase();
      return (
        p.name.toLowerCase().includes(lowerSearch) ||
        p.barcode?.toLowerCase().includes(lowerSearch)
      );
    });
  }, [products, search]);

  // Nếu search match 1 sản phẩm → highlight và auto-add
  useEffect(() => {
    if (search && filteredProducts.length === 1) {
      const matchedProduct = filteredProducts[0];
      setHighlightedId(matchedProduct.id);

      // Auto-add vào order
      onAddToOrder(matchedProduct);
    } else {
      setHighlightedId(null);
    }
  }, [search, filteredProducts, onAddToOrder]);

  if (!filteredProducts || filteredProducts.length === 0) {
    return (
      <div className="text-center text-gray-500 py-4">
        No products available.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {filteredProducts.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          onAddToOrder={onAddToOrder}
          className={highlightedId === product.id ? "ring-2 ring-primary" : ""}
        />
      ))}
    </div>
  );
}
