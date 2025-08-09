"use client";

import { useState, useEffect } from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import axios from "axios";

export default function ProductSearch({ onCategoryChange }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // Load categories from db.json
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3001/categories"); // Đổi port nếu json-server chạy khác
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Categories data is not an array:", res.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Handle select change
  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    if (onCategoryChange) {
      onCategoryChange(value);
    }
  };

  return (
    <div className="w-full max-w-sm">
      <Select value={selectedCategory || undefined} onValueChange={handleCategoryChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          {categories.length > 0 ? (
            categories.map((cat) => (
              <SelectItem
                key={cat.id}
                value={cat.id?.toString() || `cat-${cat.name}`} // luôn có value hợp lệ
              >
                {cat.name}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-category" disabled>
              No categories
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
