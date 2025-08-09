"use client";

import React, { useState } from 'react';
import CategoryTabs from '@/components/pos/CategoryTabs';
import ProductList from '@/components/pos/ProductList';
import OrderPanel from '@/components/pos/OrderPanel';
import FloatingActionBar from '@/components/shared/FloatingActionBar';
import ProductSearch from '@/components/pos/ProductSearch';
import PrintBillModal from '@/components/pos/PrintBillModal';
import useProducts from '@/lib/hooks/useProducts';
import useOrders from '@/lib/hooks/useOrders';
import axios from 'axios';

export default function POSPage() {
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  const { products } = useProducts();
  const { orders, addToOrder } = useOrders();

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:3001/categories');
      return res.data.map((c) => c.name);
    } catch (err) {
      console.error('Error loading categories:', err);
      return [];
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory ? p.category === activeCategory : true;
    return matchName && matchCategory;
  });

  return (
    <div className="p-6 h-screen flex flex-col bg-gray-100">
      <CategoryTabs
        fetchCategories={fetchCategories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        onAdd={(cat) => console.log('Add product for category:', cat)}
      />

      <div className="my-4">
        <ProductSearch
          search={search}
          onSearchChange={setSearch}
          selectedCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-white shadow-lg rounded-xl p-4">
          <ProductList products={filteredProducts} onAddToOrder={addToOrder} />
        </div>
        <div className="w-1/3 bg-white shadow-lg rounded-xl p-4">
          <OrderPanel
            cart={orders ?? []}
            selectedIndex={-1}
            onSelectIndex={() => {}}
            onRemoveItem={() => {}}
            onQuantityChange={() => {}}
            onCheckout={() => setShowPrintModal(true)}
          />
        </div>
      </div>

      <FloatingActionBar />

      {showPrintModal && <PrintBillModal onClose={() => setShowPrintModal(false)} />}
    </div>
  );
}
