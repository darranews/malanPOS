import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get('http://localhost:3001/orders');
        setOrders(res.data);
      } catch (err) {
        console.error('Lỗi load orders:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return { orders, loading };
}
