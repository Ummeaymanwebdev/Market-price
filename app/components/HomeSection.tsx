import Link from "next/link";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import { normalizeProduct, toArray } from "@/lib/normalize";
import ProductGrid, { GridSkeleton } from "./ProductGrid";

function Section({
  id,
  title,
  icon,
  iconClass = "",
  subtitle,
  children,
}: {
  id?: string;
  title: string;
  icon?: string;
  iconClass?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-32 py-6">
      <h2 className="mb-1 text-xl font-bold sm:text-2xl">
        {icon && <span className={`mr-2 ${iconClass}`}>{icon}</span>}
        {title}
      </h2>
      {subtitle ? (
        <p className="mb-4 text-sm text-base-content/60">{subtitle}</p>
      ) : (
        <div className="mb-4" />
      )}
      {children}
    </section>
  );
}

export default async function HomeSections() {
  const res = await getProducts();
  const products = toArray(res).map(normalizeProduct);

  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="mb-4 text-lg">ডেটা লোড করা যায়নি 😕</p>
        <Link href="/" className="btn btn-primary">
          আবার চেষ্টা করুন
        </Link>
      </div>
    );
  }

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      <Section
        id="risers"
        icon="▲"
        iconClass="text-success"
        title="আজ দাম বেড়েছে"
      >
        <ProductGrid products={risers} />
      </Section>

      <Section
        id="fallers"
        icon="▼"
        iconClass="text-error"
        title="আজ দাম কমেছে"
      >
        <ProductGrid products={fallers} />
      </Section>

      <Section
        id="সব-পণ্য"
        title="সব পণ্য"
        subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
      >
        <ProductGrid products={products} />
      </Section>
    </>
  );
}


export function HomeSectionsSkeleton() {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <div key={i} className="py-6">
          <div className="skeleton mb-4 h-7 w-48" />
          <GridSkeleton count={6} />
        </div>
      ))}
    </>
  );
}
