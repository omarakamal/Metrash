export const API_BASE = import.meta?.env?.VITE_API_BASE;

export async function fetchProducts(paramsObj = {}) {

  const params = new URLSearchParams();
  Object.entries(paramsObj).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") params.set(k, String(v));
  });
  console.log(`${import.meta.env.VITE_API_URL}/products?${params.toString()}`)
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

