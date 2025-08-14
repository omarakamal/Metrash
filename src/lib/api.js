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
export async function fetchProduct(id) {
  if (!id) throw new Error("Missing product id");
  const res = await fetch(`${import.meta.env.VITE_API_URL}/products/${id}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error("Product not found");
    throw new Error("Failed to fetch product");
  }
  return res.json();
}

