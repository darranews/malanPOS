// src/lib/hooks/useProduct.ts

import { useState, useEffect } from "react";
import type { Product } from "../types";
import { fetchProducts } from "../api";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setProducts(data))
      .catch(() => setError("Cannot fetch products"))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
