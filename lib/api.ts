const BASES = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function request(path: string) {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { cache: "no-store" });
      if (res.ok) return await res.json();
    } catch {
      // পরের URL চেষ্টা করো
    }
  }
  return null;
}

export const getProducts = () => request("/products");
export const getProductsByCategory = (category: string) =>
  request(`/products?category=${category}`);
export const getProduct = (id: string | number) => request(`/products/${id}`);
export const getCategories = () => request("/categories");
export const getCategory = (slug: string) => request(`/categories/${slug}`);