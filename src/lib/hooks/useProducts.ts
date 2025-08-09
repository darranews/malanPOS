import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:3001/products');
        setProducts(res.data);
      } catch (err) {
        console.error('Lỗi load products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, loading };
}
