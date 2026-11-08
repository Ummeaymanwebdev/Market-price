import { fromBn } from "@/lib/bn";

export type Market = {
  market: string;
  division: string;
  min: number;
  max: number;
};

export type Product = {
  id: string | number;
  slug: string;
  name: string;
  emoji: string; // ইমোজি অথবা ছবির লিংক (image)
  unit: string;
  price: number; // আজকের দাম
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: number; // বাড়লে +, কমলে -, অপরিবর্তিত হলে 0
  category: string; // ক্যাটাগরির slug
  categoryName: string;
  markets: Market[];
  raw: any;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
};

export function toArray(res: any): any[] {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.data)) return res.data;
  if (Array.isArray(res?.products)) return res.products;
  if (Array.isArray(res?.categories)) return res.categories;
  return [];
}

function banglaUnit(unit: string): string {
  const u = String(unit ?? "").toLowerCase().trim();
  if (u.startsWith("প্রতি")) return unit;
  if (u === "kg" || u === "kgs") return "প্রতি কেজি";
  if (u === "l" || u === "litre" || u === "liter") return "প্রতি লিটার";
  if (u === "dozen" || u === "doz") return "প্রতি ডজন";
  if (u === "pcs" || u === "pc" || u === "piece") return "প্রতি পিস";
  return unit ? `প্রতি ${unit}` : "প্রতি কেজি";
}

// {"dir":"up","pct":2.9} -> +2.9, {"dir":"down","pct":2.9} -> -2.9
function readChange(p: any, today: number, yesterday: number): number {
  let obj: any = p.change ?? p.priceChange ?? p.delta;
  if (!obj || typeof obj !== "object") {
    obj = Object.values(p).find(
      (v: any) => v && typeof v === "object" && "pct" in v && "dir" in v
    );
  }

  if (obj && typeof obj === "object") {
    const pct = Math.abs(fromBn(obj.pct ?? 0));
    const dir = String(obj.dir ?? "").toLowerCase();
    if (dir === "up") return pct;
    if (dir === "down") return -pct;
    return 0;
  }

  // change না থাকলে গতকালের দাম থেকে হিসাব করবে
  if (today > 0 && yesterday > 0) {
    return Number((((today - yesterday) / yesterday) * 100).toFixed(1));
  }
  return 0;
}

function readMarkets(p: any): Market[] {
  const list = Array.isArray(p.markets) ? p.markets : [];
  return list.map((m: any) => ({
    market: m.market ?? m.name ?? "",
    division: m.division ?? "",
    min: fromBn(m.min ?? 0),
    max: fromBn(m.max ?? 0),
  }));
}

export function normalizeProduct(p: any): Product {
  const markets = readMarkets(p);

  let price = fromBn(
    p.today ?? p.price ?? p.todayPrice ?? p.currentPrice ?? p.avgPrice ?? 0
  );
  if (!price && markets.length > 0) {
    const sum = markets.reduce((s, m) => s + (m.min + m.max) / 2, 0);
    price = Math.round(sum / markets.length);
  }

  const yesterday = fromBn(p.yesterday ?? 0);

  return {
    id: p.id ?? p._id ?? p.productId ?? p.slug ?? p.nameBn,
    slug: String(p.id ?? p._id ?? p.productId ?? p.slug ?? p.nameBn),
    name: p.nameBn ?? p.name ?? p.title ?? "",
    emoji: p.image ?? p.emoji ?? p.icon ?? "🛒",
    unit: banglaUnit(p.unitBn ?? p.unit ?? ""),
    price,
    yesterday,
    lastWeek: fromBn(p.lastWeek ?? 0),
    lastMonth: fromBn(p.lastMonth ?? 0),
    change: readChange(p, price, yesterday),
    category: p.category ?? p.categorySlug ?? "",
    categoryName: p.categoryNameBn ?? p.categoryName ?? "",
    markets,
    raw: p,
  };
}

export function normalizeCategory(c: any): Category {
  return {
    slug: String(c.slug ?? c.id ?? c._id ?? c.name),
    name: c.nameBn ?? c.name ?? c.title ?? "",
    icon: c.icon ?? c.emoji ?? "",
  };
}