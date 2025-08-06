'use client';

import { useState, useRef } from "react";
import CategoryTabs from "@/components/pos/CategoryTabs";
import ProductSearch from "@/components/pos/ProductSearch";
import ProductList from "@/components/product/ProductList";
import OrderPanel from "@/components/pos/OrderPanel";
import ProductModal from "@/components/product/ProductModal";
import PrintBillModal from "@/components/order/PrintBillModal";
import ConfirmModal from "@/components/shared/ConfirmModal";

const categories = ["coffee", "tea", "cake", "other"];
const initialProducts = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Coffee ${i + 1}`,
    price: 3.5 + i * 0.1,
    category: "coffee",
    stock: 50 + (i % 3) * 20,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 21,
    name: `Tea ${i + 1}`,
    price: 2.5 + i * 0.15,
    category: "tea",
    stock: 40 + (i % 4) * 15,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 41,
    name: `Cake ${i + 1}`,
    price: 1.5 + i * 0.2,
    category: "cake",
    stock: 30 + (i % 5) * 10,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 61,
    name: `Other ${i + 1}`,
    price: 2.0 + i * 0.25,
    category: "other",
    stock: 20 + (i % 6) * 8,
  })),
];

export default function POSPage() {
  // State
  const [products, setProducts] = useState(initialProducts);
  const [order, setOrder] = useState([]);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [editProductIndex, setEditProductIndex] = useState(null);
  const [logs, setLogs] = useState([]);
  const [showBill, setShowBill] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Modal logic...
  const openAddModal = (cat: string) => {
    setModalProduct(null);
    setShowProductModal(true);
    setActiveCategory(cat);
  };
  const openEditModal = (prod: any, idx: number) => {
    setModalProduct(prod);
    setShowProductModal(true);
    setEditProductIndex(idx);
  };
  const handleAskDelete = (product: any) => {
    setProductToDelete(product);
    setShowConfirm(true);
  };
  const handleDeleteProduct = () => {
    setProducts((products) => products.filter((p) => p.id !== productToDelete.id));
    setShowConfirm(false);
    setProductToDelete(null);
    setShowProductModal(false);
    setModalProduct(null);
    setEditProductIndex(null);
  };
  const handleCancelDelete = () => {
    setShowConfirm(false);
    setProductToDelete(null);
  };

  // Add/update product
  const handleProductSubmit = (data: any) => {
    if (data.adjustLog) {
      setLogs((logs) => [
        ...logs,
        {
          productId: data.id,
          productName: data.name,
          oldStock: data.adjustLog.oldStock,
          newStock: data.adjustLog.newStock,
          note: data.adjustLog.note,
          time: data.adjustLog.time,
        },
      ]);
      setProducts((products) =>
        products.map((p) =>
          p.id === data.id ? { ...p, ...data, stock: data.adjustLog.newStock } : p
        )
      );
    } else {
      if (data.id) {
        setProducts((products) =>
          products.map((p) => (p.id === data.id ? { ...p, ...data } : p))
        );
      } else {
        const id = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
        setProducts([...products, { ...data, id }]);
      }
    }
    setShowProductModal(false);
    setModalProduct(null);
    setEditProductIndex(null);
  };

  // Order logic
  const addToOrder = (product: any) => {
    setOrder((prev) => {
      const existing = prev.find((item: any) => item.id === product.id);
      if (existing) {
        return prev.map((item: any) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };
  const increaseQty = (id: any) =>
    setOrder(order.map((i: any) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  const decreaseQty = (id: any) =>
    setOrder(
      order
        .map((i: any) => {
          if (i.id === id) {
            if (i.qty === 1) return null;
            return { ...i, qty: i.qty - 1 };
          }
          return i;
        })
        .filter(Boolean)
    );
  const handleRemoveOrderItem = (id: any) => {
    setOrder((order: any[]) => order.filter((i: any) => i.id !== id));
  };

  // Touch edit
  const touchTimer = useRef<any>();
  const handleTouchStart = (prod: any, idx: number) => {
    touchTimer.current = setTimeout(() => openEditModal(prod, idx), 800);
  };
  const handleTouchEnd = () => clearTimeout(touchTimer.current);

  // Lọc sản phẩm
  const filteredProducts = products.filter(
    (p) =>
      p.category === activeCategory && p.name.toLowerCase().includes(search.toLowerCase())
  );

  // Total
  const total = order && order.length
    ? order.reduce((sum: number, i: any) => sum + i.price * i.qty, 0)
    : 0;

  return (
    <div className="min-h-screen h-screen bg-gray-50">
      <div className="grid grid-cols-12 gap-8 p-8 h-full">
        {/* Product List Panel */}
        <div className="col-span-8 bg-white rounded-xl shadow-sm p-6 flex flex-col h-full">
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onAdd={openAddModal}
          />
          <ProductSearch search={search} setSearch={setSearch} />
          <div className="flex-1 overflow-auto">
            <ProductList
              products={filteredProducts}
              onAddToOrder={addToOrder}
              onEdit={openEditModal}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              cols={6}
            />
          </div>
        </div>
        {/* Order Panel */}
        <div className="col-span-4 flex flex-col h-full">
          <OrderPanel
            order={order}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={handleRemoveOrderItem}
            onCancel={() => setOrder([])}
            logs={logs}
            total={total}
            onPrintBill={() => setShowBill(true)}
          />
        </div>
        {/* Modals ... */}
      </div>
    </div>
  );
}
