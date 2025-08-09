import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/lib/types/product";
import { formatMoney } from "@/lib/utils/formatMoney";

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <Card
      onClick={onClick}
      className="cursor-pointer rounded-xl overflow-hidden bg-white border border-gray-200 shadow hover:shadow-lg transition-shadow"
    >
      {/* Image - sát mép trên */}
      <div className="relative w-full aspect-square">
        <Image
          src={product.image || "/images/products/placeholder.jpg"}
          alt={product.name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Name + Price */}
      <CardContent className="p-3 text-center">
        <h3 className="text-xl font-bold text-[#7C3AED] line-clamp-2">
          {product.name}
        </h3>
        <p className="text-2xl font-extrabold text-[#10B981]">
          {formatMoney(product.price, "AUD")}
        </p>
      </CardContent>
    </Card>
  );
}
