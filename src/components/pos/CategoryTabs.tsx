'use client';

import { useEffect, useState } from 'react';

type CategoryTabsProps = {
  fetchCategories?: () => Promise<string[]>; // Hàm fetch data
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  onAdd: (cat: string) => void;
};

export default function CategoryTabs({
  fetchCategories,
  activeCategory,
  setActiveCategory,
  onAdd,
}: CategoryTabsProps) {
  const [categories, setCategories] = useState<string[] | null>(null); // null = chưa load

  useEffect(() => {
    let isMounted = true;
    if (fetchCategories) {
      fetchCategories().then((data) => {
        if (isMounted) {
          setCategories(data || []);
        }
      });
    } else {
      // Nếu không có hàm fetch thì set rỗng
      setCategories([]);
    }
    return () => {
      isMounted = false;
    };
  }, [fetchCategories]);

  return (
    <div className="flex mb-4">
      {categories === null ? (
        <span className="text-gray-400 italic">Loading...</span>
      ) : categories.length > 0 ? (
        categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              px-6 py-2 font-bold capitalize text-base 
              border-b-4 
              ${activeCategory === cat
                ? 'bg-white text-green-700 border-green-500'
                : 'bg-gray-100 text-gray-500 border-transparent'}
              transition-all duration-150 rounded-t-lg mr-2
            `}
            style={{ minWidth: 100 }}
          >
            {cat}
          </button>
        ))
      ) : (
        <span className="text-gray-400 italic">No categories</span>
      )}

      <button
        className="ml-2 text-green-600 text-2xl px-4 bg-white hover:bg-green-50 rounded-t-lg border-b-4 border-transparent"
        onClick={() => onAdd(activeCategory)}
        title="Add product"
      >+</button>
    </div>
  );
}
