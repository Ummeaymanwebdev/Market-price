import Link from "next/link";
import { toBn } from "@/lib/bn";
import type { Product } from "@/lib/normalize";
import ChangeBadge from "./ChangeBadge";
import ProductIcon from "./ProductIcon";

export default function ProductDetails({
  product: p,
  categoryName,
}: {
  product: Product;
  categoryName: string;
}) {
  const up = p.change > 0;
  const down = p.change < 0;
  const unitShort = p.unit.replace("প্রতি ", "");

  // বাজারগুলোর হিসাব
  const mins = p.markets.map((m) => m.min).filter((n) => n > 0);
  const maxs = p.markets.map((m) => m.max).filter((n) => n > 0);
  const minPrice = mins.length ? Math.min(...mins) : p.price;
  const maxPrice = maxs.length ? Math.max(...maxs) : p.price;
  const avgPrice = p.markets.length
    ? Math.round(
        p.markets.reduce((s, m) => s + (m.min + m.max) / 2, 0) /
          p.markets.length
      )
    : p.price;

  // গতকালের তুলনায় কত টাকা বদলেছে
  const diff = p.yesterday > 0 ? Math.abs(p.price - p.yesterday) : 0;

  const summary = [
    { label: "সর্বনিম্ন দাম", value: minPrice },
    { label: "সর্বোচ্চ দাম", value: maxPrice },
    { label: "গড় দাম", value: avgPrice },
  ];

  // আগের দামের তুলনা (যেগুলো পাওয়া গেছে শুধু সেগুলো)
  const compare = [
    { label: "গতকাল", value: p.yesterday },
    { label: "গত সপ্তাহ", value: p.lastWeek },
    { label: "গত মাস", value: p.lastMonth },
  ].filter((c) => c.value > 0);

  return (
    <div className="space-y-6 py-6">
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm">
        <ul>
          <li>
            <Link href="/">হোম</Link>
          </li>
          {p.category && (
            <li>
              <Link href={`/category/${p.category}`}>{categoryName}</Link>
            </li>
          )}
          <li className="text-base-content/60">{p.name}</li>
        </ul>
      </div>

      {/* উপরের কার্ড */}
      <div className="flex flex-col gap-6 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-5xl">
            <ProductIcon src={p.emoji} className="h-14 w-14" />
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold sm:text-3xl">{p.name}</h1>
            <p className="text-sm text-base-content/60">
              {p.unit} · {categoryName}
            </p>
            <p
              className={`text-sm ${
                up ? "text-success" : down ? "text-error" : "text-base-content/60"
              }`}
            >
              {up
                ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBn(diff)} টাকা`
                : down
                ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBn(diff)} টাকা`
                : "গতকালের তুলনায় আজ দাম অপরিবর্তিত"}
            </p>
          </div>
        </div>

        <div className="rounded-2xl bg-base-200 p-4 text-center sm:min-w-44">
          <p className="text-sm text-base-content/60">আজকের দাম</p>
          <p className="text-4xl font-bold text-primary">{toBn(p.price)}</p>
          <p className="mb-2 text-sm text-base-content/60">
            টাকা / {unitShort}
          </p>
          <ChangeBadge change={p.change} />
        </div>
      </div>

      {/* দামের সারসংক্ষেপ */}
      <section>
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {summary.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-base-300 bg-base-100 p-5"
            >
              <p className="text-sm text-base-content/60">{s.label}</p>
              <p className="mt-1 text-2xl font-bold">{toBn(s.value)} টাকা</p>
              <p className="text-xs text-base-content/50">{p.unit}</p>
            </div>
          ))}
        </div>

        {compare.length > 0 && (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {compare.map((c) => (
              <div
                key={c.label}
                className="rounded-2xl border border-base-300 bg-base-200 p-4"
              >
                <p className="text-sm text-base-content/60">{c.label}</p>
                <p className="mt-1 text-lg font-semibold">
                  {toBn(c.value)} টাকা
                </p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* বাজারভিত্তিক দাম */}
      <section>
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

        {p.markets.length === 0 ? (
          <p className="rounded-2xl border border-base-300 bg-base-100 p-6 text-center text-base-content/60">
            এই পণ্যের বাজারভিত্তিক দামের তথ্য এখনো নেই।
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr className="text-base-content/70">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বোচ্চ</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {p.markets.map((m, i) => (
                  <tr key={`${m.market}-${i}`}>
                    <td className="font-medium">{m.market}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{toBn(m.min)} টাকা</td>
                    <td className="text-right">{toBn(m.max)} টাকা</td>
                    <td className="text-right font-semibold">
                      {toBn(Math.round((m.min + m.max) / 2))} টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}