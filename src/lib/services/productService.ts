// src/lib/services/productService.ts
import api from "./api";
import { Product } from "@/lib/types/product";

// Lấy danh sách sản phẩm
export const getProducts = async (): Promise<Product[]> => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

// Lấy chi tiết 1 sản phẩm
export const getProductById = async (id: string): Promise<Product> => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};

// Thêm sản phẩm mới
export const addProduct = async (product: Product): Promise<Product> => {
  const res = await api.post<Product>("/products", product);
  return res.data;
};

// Cập nhật sản phẩm
export const updateProduct = async (
  id: string,
  product: Partial<Product>
): Promise<Product> => {
  const res = await api.put<Product>(`/products/${id}`, product);
  return res.data;
};

// Xóa sản phẩm
export const deleteProduct = async (id: string): Promise<void> => {
  await api.delete(`/products/${id}`);
};
