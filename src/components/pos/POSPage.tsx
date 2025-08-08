"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatMoney } from "@/lib/utils/formatMoney";
import { useProducts } from "@/lib/hooks/useProducts";
import { useOrders } from "@/lib/hooks/useOrders";
import Image from "next/image";

export default function POSPage() {
  const categories = [
    { id: "coffee", label: "Coffee" },
    { id: "tea", label: "Tea" },
    { id: "cake", label: "Cake" },
    { id: "other", label: "Other" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("coffee");

  const { products, fetchProducts } = useProducts();
  const { addItemToOrder } = useOrders();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter(
    (p) => p.category.toLowerCase() === selectedCategory
  );

  return (
    <div className="p-4">
      <Tabs
        defaultValue="coffee"
        onValueChange={(val) => setSelectedCategory(val)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-4 gap-2 mb-4">
          {categories.map((cat) => (
            <TabsTrigger
              key={cat.id}
              value={cat.id}
              className="text-lg py-2"
            >
              {cat.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((cat) => (
          <TabsContent key={cat.id} value={cat.id}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="hover:shadow-lg transition cursor-pointer"
                  >
                    <CardHeader className="p-2">
                      <CardTitle className="text-base truncate">
                        {product.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="relative w-28 h-28 mb-2">
                        <Image
                          src={product.image || "/images/products/placeholder.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <p className="text-lg font-bold mb-2">
                        {formatMoney(product.price)}
                      </p>
                      <Button
                        size="sm"
                        onClick={() => addItemToOrder(product)}
                        className="w-full"
                      >
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="col-span-full text-center text-muted-foreground">
                  No products found in this category.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
