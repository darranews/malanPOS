// src/lib/types/product.ts
export interface Product {
  id: number | string;
  name: string;
  price: number;
  category: string;
  stock: number;
  image?: string;
}
