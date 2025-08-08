"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { formatMoney } from "@/lib/formatMoney";
import { Product } from "@/lib/type";

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.image || "/images/products/placeholder.jpg"}
          alt={product.name}
          fill
          className="object-cover rounded-t-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Name + Price */}
      <CardContent className="p-2 text-center">
        <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
        <p className="text-primary font-semibold">
          {formatMoney(product.price, "AUD")}
        </p>
      </CardContent>
    </Card>
  );
}
