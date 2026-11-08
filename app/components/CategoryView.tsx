"use client";

import { useMemo, useState } from "react";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/normalize";
import ProductGrid from "./ProductGrid";

type SortKey = "default" | "asc" | "desc";

export default function CategoryView({
  name,
  icon,
  products,
}: {
  name: string;
  icon: string;
  products: Product[];
}) {
  const [sort, setSort] = useState<SortKey>("default");

  const sorted = useMemo(() => {
    const list = [...products];
    if (sort === "asc") list.sort((a, b) => a.price - b.price);
    if (sort === "desc") list.sort((a, b) => b.price - a.price);
    return list;
  }, [products, sort]);

  return (
    <div className="space-y-6 py-6">
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{icon}</span>
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-base-content/60">
            {toBn(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>

      <div className="flex justify-end rounded-2xl border border-base-300 bg-base-100 p-4">
        <label className="flex items-center gap-2 text-sm">
          <span>সাজান</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="appearance-none rounded-lg border border-base-300 bg-base-100 py-1.5 pl-3 pr-8 text-sm outline-none focus:border-primary"
            >
              <option value="default">ডিফল্ট</option>
              <option value="asc">দাম: কম থেকে বেশি</option>
              <option value="desc">দাম: বেশি থেকে কম</option>
            </select>
            <svg
              className="pointer-events-none absolute right-2 top-1/2 h-3 w-3 -translate-y-1/2"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </label>
      </div>

      <p className="text-sm text-base-content/60">
        মোট {toBn(sorted.length)}টি পণ্য দেখানো হচ্ছে
      </p>

      <ProductGrid products={sorted} />
    </div>
  );
}
