import { notFound } from "next/navigation";
import CategoryView from "@/app/components/CategoryView";
import { getCategory, getProductsByCategory } from "@/lib/api";
import {
  normalizeCategory,
  normalizeProduct,
  toArray,
} from "@/lib/normalize";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [productsRes, categoryRes] = await Promise.all([
    getProductsByCategory(slug),
    getCategory(slug),
  ]);

  const products = toArray(productsRes).map(normalizeProduct);

  // ভুল slug বা খালি ক্যাটাগরি হলে 404
  if (products.length === 0) notFound();

  const rawCategory = categoryRes?.data ?? categoryRes ?? {};
  const category = normalizeCategory({ slug, ...rawCategory });

  return (
    <CategoryView
      name={category.name || slug}
      icon={category.icon || products[0].emoji}
      products={products}
    />
  );
}