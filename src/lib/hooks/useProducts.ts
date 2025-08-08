import { useState, useCallback } from "react";
import { getProducts, createProduct, updateProductById, deleteProductById } from "@/lib/services/productService";
import { Product } from "@/lib/types/product";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, []);

  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      const newProduct = await createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err: any) {
      setError(err.message || "Failed to add product");
    }
  };

  const updateProduct = async (id: number | string, updates: Partial<Product>) => {
    try {
      const updated = await updateProductById(id, updates);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
    } catch (err: any) {
      setError(err.message || "Failed to update product");
    }
  };

  const deleteProduct = async (id: number | string) => {
    try {
      await deleteProductById(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      setError(err.message || "Failed to delete product");
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
}
