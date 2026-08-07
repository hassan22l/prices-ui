import type { Product } from "../interfaces/product";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

export async function getProduct(id: string): Promise<Product> {
  const response = await fetch(`${API_URL}/api/v1/products/${id}`);
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Buscar producto falló: ${response.status} ${response.statusText} - ${message}`);
  }
  const data: Product = await response.json();
  return data;
}

export async function saveMyPrice(id: string, price: number ) {
  const response = await fetch(`${API_URL}/api/v1/products/${id}/user_prices`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ price })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Guardar precio falló: ${response.status} ${response.statusText} - ${message}`);
  }

  const data = await response.json();
  console.log(data);
}
