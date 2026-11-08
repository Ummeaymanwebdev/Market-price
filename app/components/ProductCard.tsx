import Link from "next/link";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/normalize";
import ChangeBadge from "./ChangeBadge";
import ProductIcon from "./ProductIcon";
export default function ProductCard({ product: p }: { product: Product }) {
  return (
    <Link
      href={`/product/${p.slug}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {p.emoji}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold">{p.name}</h3>
          <p className="text-sm text-base-content/60">{p.unit}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-lg font-bold">{toBn(p.price)} টাকা</p>
        </div>
        <ChangeBadge change={p.change} />
      </div>
    </Link>
  );
}