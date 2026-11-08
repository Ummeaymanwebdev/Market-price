import { notFound } from "next/navigation";
import ProductDetails from "@/app/components/ProductDetails";
import { getCategories, getProducts } from "@/lib/api";
import {
  normalizeCategory,
  normalizeProduct,
  toArray,
} from "@/lib/normalize";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [productsRes, categoriesRes] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  // তালিকা থেকে slug / id মিলিয়ে পণ্য খোঁজা
  const products = toArray(productsRes).map(normalizeProduct);
  const product =
    products.find(
      (p) =>
        p.slug === slug ||
        String(p.id) === slug ||
        Object.values(p.raw ?? {}).some(
          (v) =>
            (typeof v === "string" || typeof v === "number") &&
            String(v) === slug
        )
    ) ?? null;

  // ভুল slug হলে ৪০৪ পেজ
  if (!product) notFound();

  const categories = toArray(categoriesRes).map(normalizeCategory);
  const categoryName =
    product.categoryName ||
    categories.find((c) => c.slug === product.category)?.name ||
    product.category ||
    "পণ্য";

  return <ProductDetails product={product} categoryName={categoryName} />;
}