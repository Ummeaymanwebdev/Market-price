import type { Product } from "@/lib/normalize";
import ProductCard from "./ProductCard";

const gridClass = "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={gridClass}>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}

export function GridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className={gridClass}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="skeleton h-[138px] rounded-2xl" />
      ))}
    </div>
  );
}