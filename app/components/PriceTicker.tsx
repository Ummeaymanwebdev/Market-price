import { getProducts } from "@/lib/api";
import { toBn, toBnPercent } from "@/lib/bn";
import { normalizeProduct, toArray } from "@/lib/normalize";

export default async function PriceTicker() {
  const res = await getProducts();
  const products = toArray(res).map(normalizeProduct);

  if (products.length === 0) return null;

  const Item = ({ p }: { p: (typeof products)[number] }) => {
    const up = p.change > 0;
    const down = p.change < 0;
    return (
      <span className="inline-flex items-center gap-2 px-5 text-sm">
        <span>{p.emoji}</span>
        <span className="font-medium">{p.name}</span>
        <span>
          {toBn(p.price)} টাকা/{p.unit.replace("প্রতি ", "")}
        </span>
        <span
          className={
            up ? "text-green-600" : down ? "text-red-600" : "text-gray-500"
          }
        >
          {up ? "▲" : down ? "▼" : "—"} {toBnPercent(p.change)}%
        </span>
      </span>
    );
  };

  return (
    <div className="bg-green-50 border-b border-green-100 overflow-hidden py-2">
      {/* দুইবার রেন্ডার করা হয়েছে যাতে লুপ কখনো থামে না */}
      <div className="marquee-track">
        {products.map((p) => (
          <Item key={`a-${p.id}`} p={p} />
        ))}
        {products.map((p) => (
          <Item key={`b-${p.id}`} p={p} />
        ))}
      </div>
    </div>
  );
}